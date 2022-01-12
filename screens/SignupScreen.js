import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Keyboard,
	TouchableWithoutFeedback,
	Image,
	KeyboardAvoidingView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import styles from "../assets/styles/SignupScreenStyles";
import { Input } from "react-native-elements";
import { Modal } from "react-native";
import { auth, db } from "../firebase";

const DismissKeyboard = ({ children }) => (
	<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
		{children}
	</TouchableWithoutFeedback>
);

const SignupScreen = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [admin, setAdmin] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [modalVisible1, setModalVisible1] = useState(false);
	const [modalVisible2, setModalVisible2] = useState(false);
	const [modalVisible3, setModalVisible3] = useState(false);

	const signup = async () => {
		if (name == "") {
			setModalVisible(true);
		} else {
			await auth
				.createUserWithEmailAndPassword(email, password)
				.then(() => {
					setAdmin(false);
					saveUser();
					navigation.navigate("HomeScreen", { admin });
					console.log(auth.currentUser.displayName);
				})
				.catch((error) => {
					if (error.code === "auth/email-already-in-use") {
						setModalVisible2(true);
					}
					if (error.code === "auth/invalid-email") {
						setModalVisible1(true);
					}
					if (error.code === "auth/weak-password") {
						setModalVisible3(true);
					}
				});
		}
	};

	const saveUser = async () => {
		await db.collection("users").doc(auth?.currentUser?.uid).set({
			studentEmail: email,
			name: name,
			userUid: auth.currentUser.uid,
		});
	};
	return (
		<DismissKeyboard>
			<KeyboardAvoidingView
				enabled
				behavior={"position"}
				style={styles.container}
			>
				<Text style={styles.appName}>Okul İçi Mesajlaşma</Text>
				<TouchableWithoutFeedback
					onPress={() => {
						Linking.openURL("https://tf.selcuk.edu.tr");
					}}
				>
					<Image
						source={{
							uri: "https://yt3.ggpht.com/ytc/AKedOLR5QchPiCRovwcUsJvTiRK47K2Q7qg9GBotheAX_w=s900-c-k-c0x00ffffff-no-rj",
						}}
						style={styles.image}
					/>
				</TouchableWithoutFeedback>
				<View style={styles.input}>
					<Input
						placeholder="Öğrenci Mail Adresinizi Giriniz"
						label="Öğrenci Mail"
						leftIcon={<Icon name="envelope" size={20} color="black" />}
						keyboardType="email-address"
						value={email}
						onChangeText={(text) => setEmail(text)}
					/>
					<Input
						placeholder="Parolanızı Giriniz"
						label="Parola"
						leftIcon={<Icon name="lock" size={24} color="black" />}
						value={password}
						onChangeText={(text) => setPassword(text)}
						secureTextEntry
					/>
					<Input
						placeholder="Adınızı Giriniz"
						label="Adınız"
						leftIcon={<Icon name="user" size={24} color="black" />}
						value={name}
						onChangeText={(text) => setName(text)}
					/>
				</View>

				<TouchableOpacity style={styles.button} onPress={() => signup()}>
					<Text style={styles.text}>Kayıt Ol</Text>
				</TouchableOpacity>
				<TouchableWithoutFeedback
					onPress={() => navigation.replace("SigninScreen")}
				>
					<View style={styles.button2}>
						<Text style={styles.text2}>Giriş Yap</Text>
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
							<Text style={styles.modalText}>Adınızı Giriniz</Text>
							<TouchableOpacity
								style={[styles.ReadButton]}
								onPress={() => setModalVisible(!modalVisible)}
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
							<Text style={styles.modalText}>E-posta Adresi Geçersiz</Text>
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
							<Text style={styles.modalText}>Kullanıcı zaten mevcut</Text>
							<TouchableOpacity
								style={[styles.ReadButton]}
								onPress={() => setModalVisible2(!modalVisible2)}
							>
								<Text style={styles.textStyle}>Tamam</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible3}
					onRequestClose={() => {
						setModalVisible3(!modalVisible3);
					}}
				>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text style={styles.modalText}>Şifre en az 6 haneli olmalı</Text>
							<TouchableOpacity
								style={[styles.ReadButton]}
								onPress={() => setModalVisible3(!modalVisible3)}
							>
								<Text style={styles.textStyle}>Tamam</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			</KeyboardAvoidingView>
		</DismissKeyboard>
	);
};

export default SignupScreen;
