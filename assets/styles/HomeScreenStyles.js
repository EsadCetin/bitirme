import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
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
	tinyLogo: {
		width: 30,
		height: 30,
		marginTop: "1%",
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
	list: {
		justifyContent: "center",
		width: windowWidth / 1,
		height: windowHeight / 10,
		alignSelf: "center",
		borderBottomWidth: 1,
	},
	room: {
		marginLeft: "6%",
		marginTop: "3%",
		fontSize: 18,
		fontFamily: "Poppins",
	},
	LogOut: {
		borderWidth: 2,
		borderColor: "black",
		borderRadius: 18,
		alignSelf: "center",
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
		width: windowWidth / 3,
		height: windowWidth / 10,
		marginBottom: 15,
	},
	LogOutText: {
		marginLeft: "2%",
		fontSize: 15,
		fontFamily: "PoppinsMedium",
		color: "black",
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
		width: windowWidth / 1.3,
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
	deleteStudent: {
		position: "absolute",
		right: windowWidth / 20,
		top: windowHeight / 50,
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
