import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Modal } from "react-native";
import { Keyboard } from "react-native";
import { View, Text, TouchableWithoutFeedback, StatusBar } from "react-native";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../assets/styles/CreateRoomScreenStyles";
import { auth, db } from "../firebase";

const DismissKeyboard = ({ children }) => (
	<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
		{children}
	</TouchableWithoutFeedback>
);

const CreateRoomScreen = ({ navigation }) => {
	const [room, setRoom] = useState("");
	const [modalVisible, setModalVisible] = useState(false);

	const createRoom = async () => {
		if (room == "") {
			return setModalVisible(true);
		} else {
			await db.collection("rooms").doc().set({
				ownerEmail: auth?.currentUser?.email,
				roomName: room,
			});
			navigation.replace("AddStudentScreen", { room });
		}
	};

	return (
		<DismissKeyboard>
			<View style={styles.container}>
				<StatusBar />
				<View style={styles.Header}>
					<Text style={styles.HeaderText}>Oda Oluştur</Text>
				</View>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Icon
						name="chevron-left"
						size={30}
						color="white"
						style={styles.backLogo}
					/>
				</TouchableOpacity>
				<View style={styles.createRoom}>
					<Input
						placeholder="Oluşturmak istediğiniz odanın adı"
						label="Oda Adı"
						leftIcon={<Icon name="plus" size={24} color="black" />}
						value={room}
						onChangeText={(text) => setRoom(text)}
					/>
				</View>
				<TouchableWithoutFeedback onPress={() => createRoom()}>
					<View style={styles.createButton}>
						<Text style={styles.createText}>Oda Oluştur</Text>
					</View>
				</TouchableWithoutFeedback>
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
							<Text style={styles.modalText}>Oda adı boş olamaz</Text>
							<TouchableOpacity
								style={styles.ReadButton}
								onPress={() => setModalVisible(!modalVisible)}
							>
								<Text style={styles.textStyle}>Tamam</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			</View>
		</DismissKeyboard>
	);
};

export default CreateRoomScreen;
