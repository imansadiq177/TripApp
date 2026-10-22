
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/GlobalStyles';

const ResultScreen = ({ route }) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    const params = route.params;

    useEffect(() => {
        if (!params) {
            setLoading(false);
            return;
        }

        const getWeather = async () => {
            setLoading(true);
            setWeather(null);

            try {
                const locationResponse = await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(params.city)}&count=1&language=da&format=json`
                );

                const locationData = await locationResponse.json();

                if (!locationData.results?.length) {
                    return;
                }

                const latitude = locationData.results[0].latitude;
                const longitude = locationData.results[0].longitude;

                const weatherResponse = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,precipitation_sum&timezone=auto&forecast_days=16`
                );

                const weatherData = await weatherResponse.json();
                setWeather(weatherData.daily || null);
            } catch (error) {
                console.log('Fejl ved hentning af vejr:', error);
            } finally {
                setLoading(false);
            }
        };

        getWeather();
    }, [params]);

    const makeDate = (date) => {
        const parts = date.split('/').map(Number);

        if (parts.length !== 3) {
            return new Date(NaN);
        }

        const result = new Date(parts[2], parts[1] - 1, parts[0]);

        if (
            result.getFullYear() !== parts[2] ||
            result.getMonth() !== parts[1] - 1 ||
            result.getDate() !== parts[0]
        ) {
            return new Date(NaN);
        }

        return result;
    };

    const formatTime = (minutes) => {
        const hours = String(Math.floor(minutes / 60)).padStart(2, '0');
        const mins = String(minutes % 60).padStart(2, '0');

        return `${hours}:${mins}`;
    };

    const createPlan = () => {
        if (!params) {
            return [];
        }

        const {
            startDate,
            endDate,
            categories = [],
            foodPreference,
            dayPercentage = 50
        } = params;

        const firstDate = makeDate(startDate);
        const lastDate = makeDate(endDate);

        if (
            Number.isNaN(firstDate.getTime()) ||
            Number.isNaN(lastDate.getTime()) ||
            lastDate < firstDate
        ) {
            return [];
        }

        const numberOfDays = Math.round(
            (
                Date.UTC(
                    lastDate.getFullYear(),
                    lastDate.getMonth(),
                    lastDate.getDate()
                ) -
                Date.UTC(
                    firstDate.getFullYear(),
                    firstDate.getMonth(),
                    firstDate.getDate()
                )
            ) / (1000 * 60 * 60 * 24)
        ) + 1;

        if (numberOfDays > 31) {
            return [];
        }

        const percentage = [25, 50, 75, 100].includes(dayPercentage)
            ? dayPercentage
            : 50;

        const dayStart = 10 * 60;
        const dayEnd = 22 * 60;
        const totalMinutes = dayEnd - dayStart;
        const plannedMinutes = totalMinutes * percentage / 100;
        const plannedEnd = dayStart + plannedMinutes;

        const activityDuration = 90;
        const activityCount = Math.floor(plannedMinutes / activityDuration);

        const activityGroups = {
            Mad: [
                foodPreference && foodPreference !== 'Ingen præference'
                    ? `Prøv en ${foodPreference.toLowerCase()} restaurant`
                    : 'Prøv en lokal restaurant',
                'Spis på en hyggelig café',
                'Oplev lokal madkultur'
            ],
            Seværdigheder: [
                'Besøg en seværdighed',
                'Oplev et kendt sted i byen',
                'Gå på opdagelse i byen'
            ],
            Shopping: [
                'Besøg et shoppingområde',
                'Udforsk lokale butikker',
                'Besøg et marked'
            ],
            Natur: [
                'Besøg en park',
                'Gåtur i et grønt område',
                'Oplev naturen'
            ],
            Kultur: [
                'Besøg et museum',
                'Oplev lokal kultur',
                'Besøg en udstilling'
            ]
        };

        const plan = [];

        for (let day = 1; day <= numberOfDays; day++) {
            const currentDate = new Date(firstDate);
            currentDate.setDate(firstDate.getDate() + day - 1);

            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const date = String(currentDate.getDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${date}`;
            const displayDate = `${date}/${month}/${year}`;

            const weatherIndex = weather?.time
                ? weather.time.indexOf(formattedDate)
                : -1;

            const temperature = weatherIndex !== -1
                ? weather.temperature_2m_max?.[weatherIndex] ?? null
                : null;

            const rain = weatherIndex !== -1 &&
                (weather.precipitation_sum?.[weatherIndex] ?? 0) > 2;

            const selectedCategories = categories.length > 0
                ? categories
                : ['Seværdigheder', 'Kultur', 'Natur'];

            const availableActivities = [];

            selectedCategories.forEach(category => {
                const options = activityGroups[category] || [];

                options.forEach(activity => {
                    let adaptedActivity = activity;

                    if (rain && category === 'Natur') {
                        adaptedActivity = 'Besøg en indendørs udstilling';
                    }

                    if (rain && category === 'Seværdigheder') {
                        adaptedActivity = 'Besøg en indendørs seværdighed';
                    }

                    if (!availableActivities.includes(adaptedActivity)) {
                        availableActivities.push(adaptedActivity);
                    }
                });
            });

            const fallbackActivities = rain
                ? [
                    'Besøg et museum',
                    'Tag på café',
                    'Oplev en indendørs seværdighed',
                    'Udforsk lokale butikker',
                    'Prøv en lokal restaurant',
                    'Besøg en udstilling',
                    'Slap af på en café',
                    'Oplev et lokalt kultursted'
                ]
                : [
                    'Udforsk byen',
                    'Besøg en lokal seværdighed',
                    'Tag på café',
                    'Besøg en park',
                    'Oplev et hyggeligt område',
                    'Udforsk lokale butikker',
                    'Prøv en lokal restaurant',
                    'Gå en tur i byen'
                ];

            fallbackActivities.forEach(activity => {
                if (!availableActivities.includes(activity)) {
                    availableActivities.push(activity);
                }
            });

            const activities = [];

            for (let index = 0; index < activityCount; index++) {
                const activityIndex =
                    (index + (day - 1) * activityCount) %
                    availableActivities.length;

                const startMinutes =
                    dayStart + index * activityDuration;

                activities.push({
                    time: formatTime(startMinutes),
                    endTime: formatTime(startMinutes + activityDuration),
                    name: availableActivities[activityIndex]
                });
            }

            plan.push({
                id: day.toString(),
                day,
                date: displayDate,
                activities,
                rain,
                temperature,
                plannedUntil: formatTime(plannedEnd),
                freeFrom: percentage < 100
                    ? formatTime(plannedEnd)
                    : null
            });
        }

        return plan;
    };

    const plan = createPlan();

    const savePlan = async () => {
        if (!params || plan.length === 0) {
            Alert.alert('Fejl', 'Der er ingen rejseplan at gemme.');
            return;
        }

        try {
            const storedPlans = await AsyncStorage.getItem('savedPlans');

            const savedPlans = storedPlans
                ? JSON.parse(storedPlans)
                : [];

            const newPlan = {
                id: Date.now().toString(),
                country: params.country,
                city: params.city,
                startDate: params.startDate,
                endDate: params.endDate,
                hotel: params.hotel,
                price: params.price,
                dayPercentage: params.dayPercentage ?? 50,
                days: plan.map(day => ({
                    ...day,
                    activities: day.activities.map(activity => (
                        `${activity.time}–${activity.endTime}: ${activity.name}`
                    ))
                }))
            };

            await AsyncStorage.setItem(
                'savedPlans',
                JSON.stringify([...savedPlans, newPlan])
            );

            Alert.alert(
                'Rejseplan gemt',
                'Din rejseplan er nu gemt under Gemte planer.'
            );
        } catch (error) {
            console.log('Fejl ved gemning:', error);
            Alert.alert('Fejl', 'Rejseplanen kunne ikke gemmes.');
        }
    };

    if (!params) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Min plan</Text>
                <Text>Du har ikke lavet en rejseplan endnu.</Text>
            </View>
        );
    }

    const {
        country,
        city,
        startDate,
        endDate,
        hotel,
        price,
        dayPercentage = 50
    } = params;

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Laver din rejseplan...</Text>
                <Text>Henter vejret for {city}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{city}, {country}</Text>

            <Text style={styles.date}>
                {startDate} - {endDate}
            </Text>

            {hotel !== '' && (
                <Text style={styles.tripInfo}>
                    Overnatning: {hotel}
                </Text>
            )}

            <Text style={styles.tripInfo}>
                Prisklasse: {price}
            </Text>

            <Text style={styles.tripInfo}>
                Planlagt: {dayPercentage}% af dagen
            </Text>

            <Text style={styles.sectionTitle}>
                Din vejertilpassede rejseplan
            </Text>

            <TouchableOpacity
                onPress={savePlan}
                style={styles.saveButton}
            >
                <Text style={styles.saveButtonText}>
                    Gem rejseplan
                </Text>
            </TouchableOpacity>

            <FlatList
                data={plan}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.dayContainer}>
                        <Text style={styles.dayTitle}>
                            Dag {item.day}
                        </Text>

                        <Text style={styles.tripInfo}>
                            {item.date}
                        </Text>

                        {item.temperature !== null ? (
                            <Text style={styles.tripInfo}>
                                {item.rain ? '🌧️' : '☀️'} Maks. {item.temperature}°C
                            </Text>
                        ) : (
                            <Text style={styles.tripInfo}>
                                Vejrudsigt ikke tilgængelig
                            </Text>
                        )}

                        {item.activities.map((activity, index) => (
                            <View
                                style={styles.planItem}
                                key={index}
                            >
                                <Text style={styles.planTime}>
                                    {activity.time}–{activity.endTime}
                                </Text>

                                <Text style={styles.planActivity}>
                                    {activity.name}
                                </Text>
                            </View>
                        ))}

                        {item.freeFrom !== null && (
                            <View style={styles.planItem}>
                                <Text style={styles.planTime}>
                                    {item.freeFrom}–22:00
                                </Text>

                                <Text style={styles.planActivity}>
                                    Fri tid til spontane aktiviteter
                                </Text>
                            </View>
                        )}
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.tripInfo}>
                        Kunne ikke lave en rejseplan. Kontrollér dine datoer.
                    </Text>
                }
            />
        </View>
    );
};

export default ResultScreen;
