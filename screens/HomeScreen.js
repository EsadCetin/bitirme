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

const DismissKeyboard = ({ children }) => (
	<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
		{children}
	</TouchableWithoutFeedback>
);

const HomeScreen = ({ route, navigation }) => {
	const [rooms, setRooms] = useState([]);
	const { admin } = route.params;

	const onSignoutPress = () => {
		auth
			.signOut()
			.then(console.log("signed out"), navigation.replace("SigninScreen"));
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
		return (
			<DismissKeyboard>
				<View style={styles.container}>
					<StatusBar />
					<View style={styles.Header}>
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
				</View>
			</DismissKeyboard>
		);
	}
};

export default HomeScreen;
