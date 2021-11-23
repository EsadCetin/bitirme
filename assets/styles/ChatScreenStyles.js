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
	HeaderText: {
		textAlign: "center",
		justifyContent: "center",
		alignSelf: "center",
		fontFamily: "Poppins",
		fontSize: 25,
		marginTop: windowHeight / 100,
		color: "white",
	},
	backLogo: {
		position: "absolute",
		marginTop: windowHeight / 30,
		marginLeft: windowWidth / 20,
	},
	create: { position: "absolute", right: "5%", top: "30%" },
});
