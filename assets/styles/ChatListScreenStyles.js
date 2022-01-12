import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	addStudent: {
		marginTop: windowHeight / 20,
		borderWidth: 2,
		width: windowWidth / 1.1,
		alignSelf: "center",
		borderRadius: 20,
	},
	list: {
		justifyContent: "center",
		width: windowWidth / 1,
		height: windowHeight / 15,
		alignSelf: "center",
		borderBottomWidth: 1,
	},
	textView: {
		marginTop: windowHeight / 40,
		borderBottomWidth: 1,
	},
	textView2: {
		marginTop: windowHeight / 40,
	},
	text: {
		fontFamily: "Poppins",
		textDecorationLine: "underline",
		fontSize: 20,
		marginBottom: "2%",
		textAlign: "center",
	},
	text2: {
		fontFamily: "PoppinsMedium",
		color: "#26a3e5",
		fontSize: 20,
		textAlign: "center",
	},
	studentNumber: {
		marginLeft: "6%",
		fontSize: 15,
		fontFamily: "Poppins",
	},

	addButton: {
		position: "absolute",
		right: windowWidth / 15,
		top: windowHeight / 5.3,
	},
	deleteStudent: {
		position: "absolute",
		right: windowWidth / 20,
		top: windowHeight / 50,
	},
	Header: {
		flexDirection: "row",
		width: windowWidth,
		alignItems: "center",
		backgroundColor: "#26a3e5",
		height: windowHeight / 10,
		justifyContent: "center",
		borderBottomWidth: 2,
	},
	backLogo: {
		position: "absolute",
		marginTop: windowHeight / 30,
		marginLeft: windowWidth / 20,
	},
	create: { position: "absolute", right: "5%", top: "30%" },
	HeaderText: {
		textAlign: "center",
		justifyContent: "center",
		alignSelf: "center",
		fontFamily: "Poppins",
		fontSize: 25,
		marginTop: "3%",
		color: "white",
	},
	deleteButton: {
		width: windowWidth / 2.3,
		height: windowHeight / 18,
		alignSelf: "center",
		justifyContent: "center",
		flexDirection: "column",
		marginBottom: windowHeight / 25,
		borderRadius: 10,
		backgroundColor: "#26a3e5",
	},
	delete: {
		height: "100%",
		width: "100%",
		marginTop: "7%",
		textAlign: "center",
		justifyContent: "center",
		alignSelf: "center",
		color: "white",
		fontFamily: "Poppins",
		fontSize: 20,
		borderRadius: 10,
	},
});
