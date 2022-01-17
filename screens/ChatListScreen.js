import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StatusBar,
	TouchableOpacity,
	FlatList,
	TouchableWithoutFeedback,
} from "react-native";
import styles from "../assets/styles/ChatListScreenStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { auth, db } from "../firebase";
import { Keyboard } from "react-native";

const DismissKeyboard = ({ children }) => (
	<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
		{children}
	</TouchableWithoutFeedback>
);

const ChatListScreen = ({ navigation, route }) => {
	const { room, key, admin, owner } = route.params;
	const [students, setStudents] = useState([]);
	const [teacherName, setTeacherName] = useState("");

	const DATA = students.map(({ id, data: { studentEmail, name } }) => {
		return {
			key: id,
			number: studentEmail,
			name: name,
		};
	});
	const getTeacherName = async () => {
		const snapshot = await db
			.collection("teachers")
			.where("teacherEmail", "==", owner)
			.get();

		snapshot.forEach((doc) => {
			setTeacherName(doc.get("name"));
		});
	};
	getTeacherName();

	const deleteRoom = async () => {
		await db.collection("rooms").doc(key).delete();
		await db
			.collection("students")
			.where("roomName", "==", room)
			.get()
			.then(function (querySnapshot) {
				querySnapshot.forEach(function (doc) {
					doc.ref.delete();
				});
			});
		navigation.navigate("HomeScreen", { admin });
	};
	useEffect(() => {
		const subscriber = db
			.collection("students")
			.where("roomName", "==", room)
			.onSnapshot((snapshot) =>
				setStudents(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						data: doc.data(),
					}))
				)
			);

		return subscriber;
	}, []);
	if (admin == true) {
		return (
			<DismissKeyboard>
				<View style={styles.container}>
					<StatusBar />
					<View style={styles.Header}>
						<Text style={styles.HeaderText}>{room}</Text>
						<TouchableOpacity
							style={styles.create}
							onPress={() => navigation.navigate("AddStudentScreen", { room })}
						>
							<Icon name="user-plus" size={35} color="white" />
						</TouchableOpacity>
					</View>
					<TouchableOpacity
						style={styles.backLogo}
						onPress={() => navigation.goBack()}
					>
						<Icon name="chevron-left" size={30} color="white" />
					</TouchableOpacity>
					<View style={styles.textView2}>
						<Text style={styles.text}>Konuşma Yöneticisi</Text>
						<Text style={styles.text2}>{teacherName}</Text>
					</View>
					<View style={styles.textView}>
						<Text style={styles.text}>Konuşmadaki Öğrenciler</Text>
					</View>
					<FlatList
						data={DATA}
						renderItem={({ item }) => (
							<View>
								<View style={styles.list}>
									<Text style={styles.studentNumber}>{item.name}</Text>
									<Text style={styles.studentNumber}>{item.number}</Text>
									<TouchableOpacity
										style={styles.deleteStudent}
										onPress={() =>
											db.collection("students").doc(item.key).delete()
										}
									>
										<Icon name="remove" size={30} color="red" />
									</TouchableOpacity>
								</View>
							</View>
						)}
					/>

					<TouchableOpacity
						style={styles.deleteButton}
						onPress={() => deleteRoom()}
					>
						<Text style={styles.delete}>
							Kanalı Sil
							<Icon name="trash" size={20} color="red" />
						</Text>
					</TouchableOpacity>
				</View>
			</DismissKeyboard>
		);
	} else {
		return (
			<DismissKeyboard>
				<View style={styles.container}>
					<StatusBar />
					<View style={styles.Header}>
						<Text style={styles.HeaderText}>{room}</Text>
					</View>
					<TouchableOpacity
						style={styles.backLogo}
						onPress={() => navigation.goBack()}
					>
						<Icon name="chevron-left" size={30} color="white" />
					</TouchableOpacity>
					<View style={styles.textView2}>
						<Text style={styles.text}>Konuşma Yöneticisi</Text>
						<Text style={styles.text2}>{teacherName}</Text>
					</View>
					<View style={styles.textView}>
						<Text style={styles.text}>Konuşmadaki Öğrenciler</Text>
					</View>
					<FlatList
						data={DATA}
						renderItem={({ item }) => (
							<View>
								<View style={styles.list}>
									<Text style={styles.studentNumber}>{item.name}</Text>
									<Text style={styles.studentNumber}>{item.number}</Text>
								</View>
							</View>
						)}
					/>
				</View>
			</DismissKeyboard>
		);
	}
};

export default ChatListScreen;
