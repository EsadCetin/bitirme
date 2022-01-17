import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StatusBar,
	FlatList,
	TouchableWithoutFeedback,
} from "react-native";
import styles from "../assets/styles/HomeScreenStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { auth, db } from "../firebase";
import { Keyboard } from "react-native";
import { Modal } from "react-native";
import { Input } from "react-native-elements";

const DismissKeyboard = ({ children }) => (
	<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
		{children}
	</TouchableWithoutFeedback>
);

const HomeScreen = ({ route, navigation }) => {
	const [rooms, setRooms] = useState([]);
	const { admin } = route.params;
	const [modalVisible, setModalVisible] = useState(false);
	const [modalVisible1, setModalVisible1] = useState(false);
	const [modalVisible2, setModalVisible2] = useState(false);
	const [key, setKey] = useState("");
	const [ownerEmail, setOwnerEmail] = useState("");
	const [roomName, setRoomName] = useState(null);
	const [studentName, setStudentName] = useState("");

	const onSignoutPress = () => {
		auth
			.signOut()
			.then(console.log("signed out"), navigation.replace("SigninScreen"));
	};

	const getStudentName = async () => {
		const snapshot = await db
			.collection("users")
			.where("studentEmail", "==", auth?.currentUser?.email)
			.get();

		snapshot.forEach((doc) => {
			setStudentName(doc.get("name"));
		});
	};
	getStudentName();

	const getRoom = async () => {
		const snapshot = await db.collection("rooms").where("key", "==", key).get();
		snapshot.forEach((doc) => {
			setOwnerEmail(doc.get("ownerEmail"));
			setRoomName(doc.get("roomName"));
		});
	};
	getRoom();

	const enterRoom = async () => {
		if (key == "") {
			setModalVisible1(true);
		} else if (ownerEmail == "") {
			setModalVisible2(true);
			console.log(ownerEmail + "2");
		} else {
			db.collection("students").doc().set({
				name: studentName,
				ownerEmail: ownerEmail,
				roomName: roomName,
				studentEmail: auth.currentUser.email,
			});
			setModalVisible(!modalVisible);
			setOwnerEmail("");
			setRoomName("");
			setKey("");
		}
	};

	if (admin == true) {
		const DATA = rooms.map(({ id, data: { roomName, ownerEmail } }) => {
			return {
				key: id,
				room: roomName,
				owner: ownerEmail,
			};
		});

		useEffect(() => {
			const subscriber = db
				.collection("rooms")
				.where("ownerEmail", "==", auth?.currentUser?.email)
				.onSnapshot((snapshot) =>
					setRooms(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							data: doc.data(),
						}))
					)
				);

			return subscriber;
		}, []);
		if (roomName == null) {
			return (
				<DismissKeyboard>
					<View style={styles.container}>
						<StatusBar />
						<View style={styles.Header}>
							<Text style={styles.HeaderText}>Mesajlaşma Odaları</Text>
							<TouchableOpacity
								style={styles.create}
								onPress={() => navigation.navigate("CreateRoomScreen")}
							>
								<Icon name="plus" size={35} color="white" />
							</TouchableOpacity>
						</View>
						<View style={styles.emptyRoom}>
							<Text style={styles.emptyRoomText}>
								Henüz bir oda oluşturmadınız.
							</Text>
						</View>
						<View>
							<TouchableOpacity
								onPress={() => onSignoutPress()}
								style={styles.LogOut}
							>
								<Icon name="sign-out" size={20} color="#26a3e5" />
								<Text style={styles.LogOutText}>Çıkış Yap</Text>
							</TouchableOpacity>
						</View>
					</View>
				</DismissKeyboard>
			);
		} else {
			return (
				<DismissKeyboard>
					<View style={styles.container}>
						<StatusBar />
						<View style={styles.Header}>
							<Text style={styles.HeaderText}>Mesajlaşma Odaları</Text>
							<TouchableOpacity
								style={styles.create}
								onPress={() => navigation.navigate("CreateRoomScreen")}
							>
								<Icon name="plus" size={35} color="white" />
							</TouchableOpacity>
						</View>
						<FlatList
							data={DATA}
							renderItem={({ item }) => (
								<View>
									<TouchableOpacity
										onPress={() =>
											navigation.navigate("ChatScreen", { item, admin })
										}
									>
										<View style={styles.list}>
											<Text style={styles.room}>{item.room}</Text>
										</View>
									</TouchableOpacity>
								</View>
							)}
						/>
						<View>
							<TouchableOpacity
								onPress={() => onSignoutPress()}
								style={styles.LogOut}
							>
								<Icon name="sign-out" size={20} color="#26a3e5" />
								<Text style={styles.LogOutText}>Çıkış Yap</Text>
							</TouchableOpacity>
						</View>
					</View>
				</DismissKeyboard>
			);
		}
	} else {
		const DATA = rooms.map(({ id, data: { roomName, ownerEmail } }) => {
			return {
				key: id,
				room: roomName,
				owner: ownerEmail,
			};
		});

		useEffect(() => {
			const subscriber = db
				.collection("students")
				.where("studentEmail", "==", auth?.currentUser?.email)
				.onSnapshot((snapshot) =>
					setRooms(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							data: doc.data(),
						}))
					)
				);

			return subscriber;
		}, []);
		if (roomName == null) {
			return (
				<DismissKeyboard>
					<View style={styles.container}>
						<StatusBar />
						<View style={styles.Header}>
							<TouchableOpacity
								style={styles.create}
								onPress={() => setModalVisible(true)}
							>
								<Icon name="key" size={35} color="white" />
							</TouchableOpacity>
							<Text style={styles.HeaderText}>Mesajlaşma Odaları</Text>
						</View>
						<View style={styles.emptyRoom}>
							<Text style={styles.emptyRoomText}>
								Henüz bir odaya katılmadınız.
							</Text>
						</View>
						<View>
							<TouchableOpacity
								onPress={() => onSignoutPress()}
								style={styles.LogOut}
							>
								<Icon name="sign-out" size={20} color="#26a3e5" />
								<Text style={styles.LogOutText}>Çıkış Yap</Text>
							</TouchableOpacity>
						</View>
						<Modal
							animationType="slide"
							transparent={true}
							visible={modalVisible}
							onRequestClose={() => {
								setModalVisible(!modalVisible);
							}}
						>
							<View style={styles.centeredView}>
								<View style={styles.modalView}>
									<TouchableOpacity
										style={styles.deleteStudent}
										onPress={() => setModalVisible(false)}
									>
										<Icon name="remove" size={30} color="#26a3e5" />
									</TouchableOpacity>
									<Input
										placeholder="Oda Anahtarını Giriniz"
										label="Oda Anahtarı"
										leftIcon={<Icon name="key" size={24} color="black" />}
										value={key}
										onChangeText={(text) => setKey(text)}
									/>
									<TouchableOpacity
										style={[styles.ReadButton]}
										onPress={() => enterRoom()}
									>
										<Text style={styles.textStyle}>Tamam</Text>
									</TouchableOpacity>
								</View>
							</View>
						</Modal>
						<Modal
							animationType="slide"
							transparent={true}
							visible={modalVisible1}
							onRequestClose={() => {
								setModalVisible1(!modalVisible1);
							}}
						>
							<View style={styles.centeredView}>
								<View style={styles.modalView}>
									<Text style={styles.modalText}>Anahtar Giriniz</Text>
									<TouchableOpacity
										style={[styles.ReadButton]}
										onPress={() => setModalVisible1(!modalVisible1)}
									>
										<Text style={styles.textStyle}>Tamam</Text>
									</TouchableOpacity>
								</View>
							</View>
						</Modal>
						<Modal
							animationType="slide"
							transparent={true}
							visible={modalVisible2}
							onRequestClose={() => {
								setModalVisible2(!modalVisible2);
							}}
						>
							<View style={styles.centeredView}>
								<View style={styles.modalView}>
									<Text style={styles.modalText}>Geçersiz Anahtar</Text>
									<TouchableOpacity
										style={[styles.ReadButton]}
										onPress={() => setModalVisible2(!modalVisible2)}
									>
										<Text style={styles.textStyle}>Tamam</Text>
									</TouchableOpacity>
								</View>
							</View>
						</Modal>
					</View>
				</DismissKeyboard>
			);
		} else {
			return (
				<DismissKeyboard>
					<View style={styles.container}>
						<StatusBar />
						<View style={styles.Header}>
							<TouchableOpacity
								style={styles.create}
								onPress={() => setModalVisible(true)}
							>
								<Icon name="key" size={35} color="white" />
							</TouchableOpacity>
							<Text style={styles.HeaderText}>Mesajlaşma Odaları</Text>
						</View>
						<FlatList
							data={DATA}
							renderItem={({ item }) => (
								<View>
									<TouchableOpacity
										onPress={() =>
											navigation.navigate("ChatScreen", { item, admin })
										}
									>
										<View style={styles.list}>
											<Text style={styles.room}>{item.room}</Text>
										</View>
									</TouchableOpacity>
								</View>
							)}
						/>
						<View>
							<TouchableOpacity
								onPress={() => onSignoutPress()}
								style={styles.LogOut}
							>
								<Icon name="sign-out" size={20} color="#26a3e5" />
								<Text style={styles.LogOutText}>Çıkış Yap</Text>
							</TouchableOpacity>
						</View>
						<Modal
							animationType="slide"
							transparent={true}
							visible={modalVisible}
							onRequestClose={() => {
								setModalVisible(!modalVisible);
							}}
						>
							<View style={styles.centeredView}>
								<View style={styles.modalView}>
									<TouchableOpacity
										style={styles.deleteStudent}
										onPress={() => setModalVisible(false)}
									>
										<Icon name="remove" size={30} color="#26a3e5" />
									</TouchableOpacity>
									<Input
										placeholder="Oda Anahtarını Giriniz"
										label="Oda Anahtarı"
										leftIcon={<Icon name="key" size={24} color="black" />}
										value={key}
										onChangeText={(text) => setKey(text)}
									/>
									<TouchableOpacity
										style={[styles.ReadButton]}
										onPress={() => enterRoom()}
									>
										<Text style={styles.textStyle}>Tamam</Text>
									</TouchableOpacity>
								</View>
							</View>
						</Modal>
						<Modal
							animationType="slide"
							transparent={true}
							visible={modalVisible1}
							onRequestClose={() => {
								setModalVisible1(!modalVisible1);
							}}
						>
							<View style={styles.centeredView}>
								<View style={styles.modalView}>
									<Text style={styles.modalText}>Anahtar Giriniz</Text>
									<TouchableOpacity
										style={[styles.ReadButton]}
										onPress={() => setModalVisible1(!modalVisible1)}
									>
										<Text style={styles.textStyle}>Tamam</Text>
									</TouchableOpacity>
								</View>
							</View>
						</Modal>
						<Modal
							animationType="slide"
							transparent={true}
							visible={modalVisible2}
							onRequestClose={() => {
								setModalVisible2(!modalVisible2);
							}}
						>
							<View style={styles.centeredView}>
								<View style={styles.modalView}>
									<Text style={styles.modalText}>Geçersiz Anahtar</Text>
									<TouchableOpacity
										style={[styles.ReadButton]}
										onPress={() => setModalVisible2(!modalVisible2)}
									>
										<Text style={styles.textStyle}>Tamam</Text>
									</TouchableOpacity>
								</View>
							</View>
						</Modal>
					</View>
				</DismissKeyboard>
			);
		}
	}
};

export default HomeScreen;
