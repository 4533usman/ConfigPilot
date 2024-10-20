import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Introduction from '../screens/Introduction';
import Home from '../screens/Home';
import ChatScreen from '../screens/ChatScreen';
import HeaderWithImage from '../components/HeaderWithImage';
const StackNavigation = () => {

    const Stack = createNativeStackNavigator();


    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Introduction">
                <Stack.Screen
                    name="Introduction"
                    component={Introduction}
                    options={
                        {
                            headerTitle: () => <HeaderWithImage title="ConfigPilot" />,
                            headerTitleAlign: "center"
                        }
                    }
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={
                        {
                            headerTitle: () => <HeaderWithImage title="ConfigPilot" />,
                            headerTitleAlign: "center"
                        }
                    }
                />
                <Stack.Screen
                    name="ChatScreen"
                    component={ChatScreen}
                    options={
                        {
                            headerTitle: () => <HeaderWithImage title="ConfigPilot" />,
                            headerTitleAlign: "center"
                        }
                    }
                />
            </Stack.Navigator>

        </NavigationContainer>
    )
}

export default StackNavigation