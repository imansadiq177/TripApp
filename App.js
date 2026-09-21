import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from './screens/HomeScreen';
import PlanScreen from './screens/PlanScreen';
import ResultScreen from './screens/ResultScreen';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>

            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused
                                ? 'home'
                                : 'home-outline';

                        } else if (route.name === 'Plan') {
                            iconName = focused
                                ? 'airplane'
                                : 'airplane-outline';

                        } else if (route.name === 'Result') {
                            iconName = focused
                                ? 'map'
                                : 'map-outline';
                        }

                        return (
                            <Ionicons
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        );
                    }
                })}
            >

                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Hjem' }}
                />

                <Tab.Screen
                    name="Plan"
                    component={PlanScreen}
                    options={{ title: 'Planlæg' }}
                />

                <Tab.Screen
                    name="Result"
                    component={ResultScreen}
                    options={{ title: 'Min plan' }}
                />

            </Tab.Navigator>

        </NavigationContainer>
    );
}