import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, {useState, useEffect} from "react";
import { firebase } from "../config";


import Login from "../src/Login";
import Registration from "../src/Registration";
import Home from "../src/Home";
import Header from "../components/Header";
import Profile from "../src/Profile";
import Header_app from "../components/Header_app";


const Stack = createStackNavigator();

function App() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    if (initializing) return null;

    if (!user) {
        return (
            <Stack.Navigator>
                <Stack.Screen 
                name="Login"
                component={Login}
                options={{
                    headerTitle: () => <Header name="Guess The Graph" />,
                    headerStyle: {
                        height: 110,
                        borderBottomLeftRadius: 50,
                        borderBottomRightRadius: 50,
                        backgroundColor: '#77AAFF',
                        shadowColor: '#000',
                        elevation: 25,
                    }
                }}
                />
                <Stack.Screen 
                name="Registration"
                component={Registration}
                options={{
                    headerTitle: () => <Header name="Guess The Graph" />,
                    headerStyle: {
                        height: 110,
                        borderBottomLeftRadius: 50,
                        borderBottomRightRadius: 50,
                        backgroundColor: '#77AAFF',
                        shadowColor: '#000',
                        elevation: 25,
                    }
                }}
                />
            </Stack.Navigator>
        );
    }
    return (
        <Stack.Navigator>
            <Stack.Screen 
            name="Home"
            component={Home}
            options={{
                headerTitle: () => <Header_app/>,
                // headerStyle: {
                //     height: 110,
                //     borderBottomLeftRadius: 50,
                //     borderBottomRightRadius: 50,
                //     backgroundColor: '#77AAFF',
                //     shadowColor: '#000',
                //     elevation: 25,
                // }
            }}
            />
        </Stack.Navigator>
    );
}

export default App;