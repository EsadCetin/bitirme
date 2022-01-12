import React from "react";
import { useFonts } from "expo-font";
import { ActivityIndicator } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SigninScreen from "./screens/SigninScreen";
import TeacherSigninScreen from "./screens/TeacherSigninScreen";
import HomeScreen from "./screens/HomeScreen";
import ChatScreen from "./screens/ChatScreen";
import CreateRoomScreen from "./screens/CreateRoomScreen";
import AddStudentScreen from "./screens/AddStudentScreen";
import ChatListScreen from "./screens/ChatListScreen";
import SignupScreen from "./screens/SignupScreen";
import { View, LogBox } from "react-native";

LogBox.ignoreAllLogs();
const Stack = createStackNavigator();

function MyStack() {
	return (
		<Stack.Navigator initialRouteName={SigninScreen}>
			<Stack.Screen
				name="SigninScreen"
				options={{ headerShown: false }}
				component={SigninScreen}
			/>
			<Stack.Screen
				name="TeacherSigninScreen"
				options={{ headerShown: false }}
				component={TeacherSigninScreen}
			/>
			<Stack.Screen
				name="HomeScreen"
				options={{ headerShown: false }}
				component={HomeScreen}
			/>
			<Stack.Screen
				name="ChatScreen"
				options={{ headerShown: false }}
				component={ChatScreen}
			/>
			<Stack.Screen
				name="CreateRoomScreen"
				options={{ headerShown: false }}
				component={CreateRoomScreen}
			/>
			<Stack.Screen
				name="AddStudentScreen"
				options={{ headerShown: false }}
				component={AddStudentScreen}
			/>
			<Stack.Screen
				name="ChatListScreen"
				options={{ headerShown: false }}
				component={ChatListScreen}
			/>
			<Stack.Screen
				name="SignupScreen"
				options={{ headerShown: false }}
				component={SignupScreen}
			/>
		</Stack.Navigator>
	);
}

export default function App() {
	let [fontsLoaded] = useFonts({
		Yellowtail: require("./assets/fonts/Yellowtail-Regular.ttf"),
		Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
		PoppinsMedium: require("./assets/fonts/Poppins-Medium.ttf"),
	});

	if (!fontsLoaded) {
		return (
			<View
				style={{
					flexDirection: "row",
					alignSelf: "center",
					justifyContent: "center",
					flex: 1,
				}}
			>
				<ActivityIndicator size="large" color="#26a3e5" />
			</View>
		);
	} else {
		return (
			<NavigationContainer>
				<MyStack />
			</NavigationContainer>
		);
	}
}
