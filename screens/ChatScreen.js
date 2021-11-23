import React from "react";
import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import styles from "../assets/styles/ChatScreenStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { GiftedChat } from "react-native-gifted-chat";

const ChatScreen = ({ route, navigation }) => {
	const { room, key, owner } = route.params.item;
	const { admin } = route.params;

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
				alwaysShowSend={true}
				placeholder="Mesajınızı Yazın"
				renderSend={(props) => (
					<Icon
						style={{ alignSelf: "center", marginRight: "4%" }}
						color={"#26a3e5"}
						size={20}
						name="paper-plane"
					/>
				)}
			/>
		</View>
	);
};

export default ChatScreen;
