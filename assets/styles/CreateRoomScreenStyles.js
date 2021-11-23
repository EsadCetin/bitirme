import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	createRoom: {
		marginTop: windowHeight / 4,
		borderWidth: 2,
		width: windowWidth / 1.2,
		alignSelf: "center",
		borderRadius: 20,
	},
	createButton: {
		backgroundColor: "#26a3e5",
		width: windowWidth / 3,
		height: windowHeight / 15,
		alignSelf: "center",
		alignItems: "center",
		justifyContent: "center",
		marginTop: windowHeight / 15,
		borderRadius: 10,
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
	createText: {
		fontSize: 15,
		color: "white",
		alignSelf: "center",
		justifyContent: "center",
	},
	create: { position: "absolute", right: "5%", top: "30%" },
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
