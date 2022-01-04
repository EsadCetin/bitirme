import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import styles from "../assets/styles/ChatScreenStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { GiftedChat, Send } from "react-native-gifted-chat";
import { auth, db } from "../firebase";
import React, { useCallback, useLayoutEffect, useState } from "react";

const ChatScreen = ({ route, navigation }) => {
	const { room, key, owner } = route.params.item;
	const { admin } = route.params;
	const [messages, setMessages] = useState([]);

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
		});
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
				messages={messages}
				placeholder="Mesajınızı Yazın"
				renderUsernameOnMessage={true}
				renderAvatar={() => null}
				showAvatarForEveryMessage={true}
				onSend={(messages) => onSend(messages)}
				user={{
					_id: auth?.currentUser?.email,
					name: auth?.currentUser?.email,
					room: room,
				}}
				renderSend={(props) => (
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
				)}
			/>
		</View>
	);
};

export default ChatScreen;
