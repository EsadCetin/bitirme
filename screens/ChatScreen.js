import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import styles from "../assets/styles/ChatScreenStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { Actions, GiftedChat, Send } from "react-native-gifted-chat";
import { auth, db } from "../firebase";

import React, {
	useCallback,
	useEffect,
	useLayoutEffect,
	useState,
} from "react";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { Image } from "react-native";

const ChatScreen = ({ route, navigation }) => {
	const { room, key, owner } = route.params.item;
	const { admin } = route.params;
	const [messages, setMessages] = useState([]);
	const [name, setName] = useState("");
	const [image, setImage] = useState("");

	const getUser = async () => {
		await db
			.collection("users")
			.doc(auth?.currentUser?.uid)
			.get()
			.then(function (doc) {
				if (doc.exists) {
					setName(doc.get("name"));
				}
			});
	};
	getUser();

	const renderSend = (props) => (
		<Send
			{...props}
			disabled={!props.text}
			containerStyle={{
				width: 44,
				height: 44,
				alignItems: "center",
				justifyContent: "center",
				marginHorizontal: 4,
			}}
		>
			<Icon
				style={{ alignSelf: "center", marginRight: "4%" }}
				color={"#26a3e5"}
				size={20}
				name="paper-plane"
			/>
		</Send>
	);
	const renderMessageImage = (props) => {
		return (
			<View
				style={{
					borderRadius: 15,
					padding: 2,
				}}
			>
				<Image
					resizeMode="contain"
					style={{
						width: 200,
						height: 200,
						padding: 6,
						borderRadius: 15,
						resizeMode: "cover",
					}}
					source={{ uri: props.currentMessage.image }}
				/>
			</View>
		);
	};

	const renderActions = (props) => (
		<Actions
			{...props}
			containerStyle={{
				width: 44,
				height: 44,
				alignItems: "center",
				justifyContent: "center",
				marginLeft: 4,
				marginRight: 4,
				marginBottom: 0,
			}}
			icon={() => (
				<Icon
					style={{ alignSelf: "center", marginRight: "4%" }}
					color={"#26a3e5"}
					size={30}
					name="plus-circle"
				/>
			)}
			options={{
				"Fotoğraflarımdan Seç": () => {
					pickImage();
				},
				"Kameradan Çek": () => {
					openCamera();
				},
				"Dosya Seç": () => {
					pickDocument();
				},
				Iptal: () => {},
			}}
			optionTintColor="#222B45"
		/>
	);
	const openCamera = async () => {
		const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

		if (permissionResult.granted === false) {
			alert("Üzgünüz, kameranıza erişmemize izin vermen gerekiyor!");
			return;
		}

		const result = await ImagePicker.launchCameraAsync();

		if (!result.cancelled) {
			setImage(result.uri);
			console.log({ image });
			return result.uri;
		}
	};
	useEffect(() => {
		(async () => {
			if (Platform.OS !== "web") {
				const { status } =
					await ImagePicker.requestMediaLibraryPermissionsAsync();
				if (status !== "granted") {
					alert("Üzgünüz, fotoğraflarına erişmemize izin vermen gerekiyor!");
				}
			}
		})();
	}, []);

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [3, 3],
			quality: 1,
		});

		if (!result.cancelled) {
			setImage(result.uri);
			console.log({ image });
			return result.uri;
		}
	};
	const pickDocument = async () => {
		const result = await DocumentPicker.getDocumentAsync({});
	};
	useLayoutEffect(() => {
		const unsubscribe = db
			.collection(room)
			.orderBy("createdAt", "desc")
			.onSnapshot((snapshot) =>
				setMessages(
					snapshot.docs.map((doc) => ({
						_id: doc.data()._id,
						createdAt: doc.data().createdAt.toDate(),
						text: doc.data().text,
						user: doc.data().user,
						image: doc.data().image,
					}))
				)
			);
		return unsubscribe;
	}, []);

	const onSend = useCallback((messages = []) => {
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, messages)
		);
		const { _id, createdAt, text, user } = messages[0];
		db.collection(room).add({
			_id,
			createdAt,
			text,
			user,
			image,
		});
		setImage("");
	}, []);

	return (
		<View style={styles.container}>
			<StatusBar />
			<View style={styles.Header}>
				<TouchableOpacity
					onPress={() =>
						navigation.navigate("ChatListScreen", { room, key, admin, owner })
					}
				>
					<Text style={styles.HeaderText}>{room}</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				style={styles.backLogo}
				onPress={() => navigation.goBack()}
			>
				<Icon name="chevron-left" size={30} color="white" />
			</TouchableOpacity>
			<GiftedChat
				renderActions={renderActions}
				messages={messages}
				placeholder="Mesajınızı Yazın"
				renderUsernameOnMessage={true}
				alwaysShowSend={true}
				onLongPress={() => null}
				showAvatarForEveryMessage={false}
				onSend={(messages) => onSend(messages)}
				user={{
					_id: auth?.currentUser?.email,
					name: name,
					room: room,
				}}
				renderSend={renderSend}
				renderMessageImage={renderMessageImage}
			/>
		</View>
	);
};

export default ChatScreen;
