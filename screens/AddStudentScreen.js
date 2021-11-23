import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StatusBar,
	TouchableWithoutFeedback,
	Modal,
	TouchableOpacity,
	FlatList,
} from "react-native";
import { Input } from "react-native-elements";
import styles from "../assets/styles/AddStudentScreenStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { auth, db } from "../firebase";
import { Keyboard } from "react-native";

const DismissKeyboard = ({ children }) => (
	<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
		{children}
	</TouchableWithoutFeedback>
);

const AddStudentScreen = ({ navigation, route }) => {
	const { room } = route.params;
	const [student, setStudent] = useState("");
	const [modalVisible, setModalVisible] = useState(false);
	const [students, setStudents] = useState([]);
	const [admin, setAdmin] = useState(true);

	const DATA = students.map(({ id, data: { studentEmail } }) => {
		return {
			key: id,
			number: studentEmail,
		};
	});

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

	const addStudent = async () => {
		if (student == "") {
			return setModalVisible(true);
		} else {
			await db
				.collection("students")
				.doc()
				.set({
					ownerEmail: auth?.currentUser?.email,
					roomName: room,
					studentEmail: student + "@ogr.selcuk.edu.tr",
				});
			setStudent("");
		}
	};
	return (
		<DismissKeyboard>
			<View style={styles.container}>
				<StatusBar />
				<View style={styles.Header}>
					<Text style={styles.HeaderText}>Öğrenci Ekle</Text>
				</View>
				<View style={styles.addStudent}>
					<Input
						placeholder="Eklemek İstediğiniz Öğrenci Numarası"
						label="Öğrenci No"
						value={student}
						keyboardType="number-pad"
						onChangeText={(text) => setStudent(text)}
					/>
				</View>
				<TouchableWithoutFeedback onPress={() => addStudent()}>
					<View style={styles.addButton}>
						<Icon name="user-plus" size={25} color="#26a3e5" />
					</View>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback
					onPress={() => navigation.replace("HomeScreen", { admin })}
				>
					<View style={styles.button}>
						<Text style={styles.addText}>Bitti</Text>
					</View>
				</TouchableWithoutFeedback>
				<View style={styles.textView}>
					<Text style={styles.text}>Eklenen Öğrenciler</Text>
				</View>
				<FlatList
					data={DATA}
					renderItem={({ item }) => (
						<View>
							<View style={styles.list}>
								<Text style={styles.studentNumber}>{item.number}</Text>
							</View>
							<TouchableOpacity
								style={styles.deleteStudent}
								onPress={() => db.collection("students").doc(item.key).delete()}
							>
								<Icon name="remove" size={30} color="red" />
							</TouchableOpacity>
						</View>
					)}
				/>
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
							<Text style={styles.modalText}>Öğrenci Numarası Boş Olamaz</Text>
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

export default AddStudentScreen;
