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
		borderBottomWidth: 2,
	},
	text: {
		fontFamily: "Poppins",
		textDecorationLine: "underline",
		fontSize: 15,
		marginLeft: windowWidth / 20,
	},
	studentNumber: {
		marginLeft: "6%",
		marginTop: "3%",
		fontSize: 18,
		fontFamily: "Poppins",
	},
	button: {
		backgroundColor: "#26a3e5",
		width: windowWidth / 3,
		height: windowHeight / 15,
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
		marginTop: windowHeight / 40,
		borderRadius: 10,
	},
	deleteStudent: {
		position: "absolute",
		right: windowWidth / 20,
		top: windowHeight / 60,
	},
	addButton: {
		position: "absolute",
		right: windowWidth / 15,
		top: windowHeight / 5.3,
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
	addText: {
		fontSize: 15,
		color: "white",
		alignSelf: "center",
		justifyContent: "center",
	},
	add: { position: "absolute", right: "5%", top: "30%" },
	HeaderText: {
		textAlign: "center",
		width: "65%",
		justifyContent: "center",
		alignSelf: "center",
		fontFamily: "Poppins",
		fontSize: 25,
		marginTop: "3%",
		color: "white",
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 10,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	ReadButton: {
		borderRadius: 10,
		padding: 10,
		elevation: 2,
		backgroundColor: "#26a3e5",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: "10%",
		textAlign: "center",
	},
});
