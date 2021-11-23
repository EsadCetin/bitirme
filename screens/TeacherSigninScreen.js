import React, { useEffect, useState } from "react";
import { Linking } from "react-native";
import { Keyboard } from "react-native";
import {
	View,
	TouchableWithoutFeedback,
	Text,
	Image,
	StatusBar,
	Modal,
	TouchableOpacity,
} from "react-native";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../assets/styles/TeacherSigninScreenStyles";
import { auth } from "../firebase";

const DismissKeyboard = ({ children }) => (
	<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
		{children}
	</TouchableWithoutFeedback>
);
const TeacherSigninScreen = ({ navigation }) => {
	const [email, setNumber] = useState("");
	const [password, setPassword] = useState("");
	const [admin, setAdmin] = useState(true);
	const [modalVisible1, setModalVisible1] = useState(false);
	const [modalVisible2, setModalVisible2] = useState(false);
	const [modalVisible3, setModalVisible3] = useState(false);

	const signin = async () => {
		await auth
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				setAdmin(true);
				navigation.navigate("HomeScreen", { admin });
			})
			.catch((error) => {
				if (error.code === "auth/invalid-email") {
					setModalVisible1(true);
				} else if (error.code === "auth/user-not-found") {
					setModalVisible2(true);
				} else if (error.code === "auth/wrong-password") {
					setModalVisible3(true);
				}
			});
	};

	return (
		<DismissKeyboard>
			<View style={styles.container}>
				<StatusBar />
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
						placeholder="Öğretim Görevlisi Mail Adresinizi Giriniz"
						label="Öğretim Görevlisi Mail"
						keyboardType="email-address"
						leftIcon={<Icon name="envelope" size={20} color="black" />}
						value={email}
						onChangeText={(text) => setNumber(text)}
					/>
					<Input
						placeholder="Parolanızı Giriniz"
						label="Parola"
						leftIcon={<Icon name="lock" size={24} color="black" />}
						value={password}
						onChangeText={(text) => setPassword(text)}
						secureTextEntry
					/>
				</View>
				<TouchableWithoutFeedback onPress={() => signin()}>
					<View style={styles.button}>
						<Text style={styles.text}>Giriş Yap</Text>
					</View>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback
					onPress={() => navigation.replace("SigninScreen")}
				>
					<View style={styles.button2}>
						<Text style={styles.text2}>Öğrenci Girişi</Text>
					</View>
				</TouchableWithoutFeedback>
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
							<Text style={styles.modalText}>Kullanıcı Bulunamadı</Text>
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
							<Text style={styles.modalText}>Hatalı Şifre</Text>
							<TouchableOpacity
								style={[styles.ReadButton]}
								onPress={() => setModalVisible3(!modalVisible3)}
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

export default TeacherSigninScreen;
