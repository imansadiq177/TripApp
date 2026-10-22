
import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/GlobalStyles';

const SavedPlansScreen = () => {
    const [savedPlans, setSavedPlans] = useState([]);
    const [expandedPlanId, setExpandedPlanId] = useState(null);

    const loadPlans = async () => {
        try {
            const storedPlans = await AsyncStorage.getItem('savedPlans');
            const plans = storedPlans ? JSON.parse(storedPlans) : [];

            setSavedPlans(Array.isArray(plans) ? plans : []);
        } catch (error) {
            Alert.alert('Fejl', 'Kunne ikke hente dine gemte rejseplaner.');
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadPlans();
        }, [])
    );

    const deletePlan = (id) => {
        Alert.alert(
            'Slet rejseplan',
            'Er du sikker på, at du vil slette denne rejseplan?',
            [
                {
                    text: 'Annuller',
                    style: 'cancel'
                },
                {
                    text: 'Slet',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const updatedPlans = savedPlans.filter(
                                (plan) => plan.id !== id
                            );

                            await AsyncStorage.setItem(
                                'savedPlans',
                                JSON.stringify(updatedPlans)
                            );

                            setSavedPlans(updatedPlans);

                            if (expandedPlanId === id) {
                                setExpandedPlanId(null);
                            }
                        } catch (error) {
                            Alert.alert(
                                'Fejl',
                                'Rejseplanen kunne ikke slettes.'
                            );
                        }
                    }
                }
            ]
        );
    };

    const togglePlan = (id) => {
        setExpandedPlanId(
            expandedPlanId === id ? null : id
        );
    };

    const renderPlan = ({ item }) => {
        const isExpanded = expandedPlanId === item.id;

        return (
            <View style={styles.savedPlanCard}>

                <Text style={styles.savedPlanTitle}>
                    {item.city}, {item.country}
                </Text>

                <Text style={styles.savedPlanDate}>
                    {item.startDate} - {item.endDate}
                </Text>

                <TouchableOpacity
                    style={styles.planButton}
                    onPress={() => togglePlan(item.id)}
                >
                    <Text style={styles.planButtonText}>
                        {isExpanded ? 'Skjul rejseplan' : 'Se rejseplan'}
                    </Text>
                </TouchableOpacity>

                {isExpanded && (
                    <View>
                        {item.hotel ? (
                            <Text style={styles.tripInfo}>
                                Overnatning: {item.hotel}
                            </Text>
                        ) : null}

                        {item.price ? (
                            <Text style={styles.tripInfo}>
                                Prisklasse: {item.price}
                            </Text>
                        ) : null}

                        {(item.days || []).map((day, index) => (
                            <View
                                key={`${item.id}-${index}`}
                                style={styles.dayContainer}
                            >
                                <Text style={styles.dayTitle}>
                                    Dag {day.day}
                                </Text>

                                <Text style={styles.tripInfo}>
                                    {day.date}
                                </Text>

                                {day.temperature !== null &&
                                day.temperature !== undefined ? (
                                    <Text style={styles.tripInfo}>
                                        {day.rain ? '🌧️' : '☀️'} Maks. {day.temperature}°C
                                    </Text>
                                ) : (
                                    <Text style={styles.tripInfo}>
                                        Vejrudsigt ikke tilgængelig
                                    </Text>
                                )}

                                {(day.activities || []).map(
                                    (activity, activityIndex) => (
                                        <View
                                            key={activityIndex}
                                            style={styles.planItem}
                                        >
                                            <Text style={styles.planTime}>
                                                {10 + activityIndex * 2}:00
                                            </Text>

                                            <Text style={styles.planActivity}>
                                                {activity}
                                            </Text>
                                        </View>
                                    )
                                )}
                            </View>
                        ))}
                    </View>
                )}

                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deletePlan(item.id)}
                >
                    <Text style={styles.deleteButtonText}>
                        Slet rejseplan
                    </Text>
                </TouchableOpacity>

            </View>
        );
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Gemte rejseplaner
            </Text>

            <FlatList
                data={savedPlans}
                keyExtractor={(item) => item.id}
                renderItem={renderPlan}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <Text style={styles.tripInfo}>
                        Du har endnu ikke gemt nogen rejseplaner.
                    </Text>
                }
            />

        </View>
    );
};

export default SavedPlansScreen;
