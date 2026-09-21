import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';

import styles from '../styles/GlobalStyles';

const ResultScreen = ({ route }) => {

    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    const params = route.params;

    //hente vejrdata
    useEffect(() => {

        if (!params) {
            setLoading(false);
            return;
        }

        const getWeather = async () => {

            try {

                //finde byen og dens koordinater
                const locationResponse = await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(params.city)}&count=1&language=da&format=json`
                );

                const locationData = await locationResponse.json();

                if (!locationData.results) {
                    setLoading(false);
                    return;
                }

                const latitude = locationData.results[0].latitude;
                const longitude = locationData.results[0].longitude;

                //hente vejret for byen
                const weatherResponse = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,precipitation_sum&timezone=auto&forecast_days=16`
                );

                const weatherData = await weatherResponse.json();

                setWeather(weatherData.daily);
                setLoading(false);

            } catch (error) {

                console.log('Fejl ved hentning af vejr:', error);
                setLoading(false);

            }
        };

        getWeather();

    }, [params]);


    //hvis der ikke er lavet en plan
    if (!params) {

        return (
            <View style={styles.container}>

                <Text style={styles.title}>
                    Min plan
                </Text>

                <Text>
                    Du har ikke lavet en rejseplan endnu.
                </Text>

            </View>
        );
    }


    const {
        country,
        city,
        startDate,
        endDate,
        hotel,
        categories,
        foodPreference,
        price
    } = params;

    const makeDate = (date) => {

        const parts = date.split('/');

        return new Date(
            parts[2],
            parts[1] - 1,
            parts[0]
        );
    };


    const firstDate = makeDate(startDate);
    const lastDate = makeDate(endDate);

    const difference = lastDate - firstDate;

    const numberOfDays =
        Math.floor(
            difference / (1000 * 60 * 60 * 24)
        ) + 1;


    // Mockdata ikke rigtig (dog noget jeg vil implementere i senere version)

    const foodActivities = [
        foodPreference + ' restaurant',
        foodPreference + ' frokost',
        'Café eller restaurant'
    ];

    const shoppingActivities = [
        'Shoppingområde',
        'Lokale butikker',
        'Marked eller shopping'
    ];

    const sightseeingActivities = [
        'Besøg en seværdighed',
        'Oplev et kendt sted i byen',
        'Gå på opdagelse i byen'
    ];

    const natureActivities = [
        'Besøg en park',
        'Gåtur i et grønt område',
        'Oplevelse i naturen'
    ];

    const cultureActivities = [
        'Kulturel oplevelse',
        'Besøg et museum',
        'Oplev lokal kultur'
    ];


    // lave rejseplan

    const plan = [];

    for (let day = 1; day <= numberOfDays; day++) {

        const activities = [];

        const currentDate = new Date(firstDate);

        currentDate.setDate(
            firstDate.getDate() + (day - 1)
        );


        const year = currentDate.getFullYear();

        const month = String(
            currentDate.getMonth() + 1
        ).padStart(2, '0');

        const date = String(
            currentDate.getDate()
        ).padStart(2, '0');


        //format som vejr-API'et bruger
        const formattedDate =
            year + '-' + month + '-' + date;


        //format som brugeren ser
        const displayDate =
            date + '/' + month + '/' + year;


        //finder det rigtige vejrdata som appen bruger
        let weatherIndex = -1;

        if (weather && weather.time) {

            weatherIndex =
                weather.time.indexOf(formattedDate);
        }

        let rain = false;
        let temperature = null;


        if (weatherIndex !== -1) {

            temperature =
                weather.temperature_2m_max[weatherIndex];


            if (
                weather.precipitation_sum[weatherIndex] > 2
            ) {

                rain = true;
            }
        }

        if (categories.includes('Seværdigheder')) {

            if (rain) {

                activities.push(
                    'Besøg en indendørs seværdighed'
                );

            } else {

                activities.push(
                    sightseeingActivities[
                        (day - 1) %
                        sightseeingActivities.length
                    ]
                );
            }
        }

        if (categories.includes('Mad')) {

            activities.push(
                foodActivities[
                    (day - 1) %
                    foodActivities.length
                ]
            );
        }

        if (categories.includes('Shopping')) {

            activities.push(
                shoppingActivities[
                    (day - 1) %
                    shoppingActivities.length
                ]
            );
        }

        if (categories.includes('Natur')) {

            if (rain) {

                activities.push(
                    'Indendørs aktivitet på grund af regn'
                );

            } else {

                activities.push(
                    natureActivities[
                        (day - 1) %
                        natureActivities.length
                    ]
                );
            }
        }

        if (categories.includes('Kultur')) {

            activities.push(
                cultureActivities[
                    (day - 1) %
                    cultureActivities.length
                ]
            );
        }

        plan.push({

            id: day.toString(),

            day: day,

            date: displayDate,

            activities: activities,

            rain: rain,

            temperature: temperature

        });
    }

    if (loading) {

        return (
            <View style={styles.container}>

                <Text style={styles.title}>
                    Laver din rejseplan...
                </Text>

                <Text>
                    Henter vejret for {city}
                </Text>

            </View>
        );
    }
    //vise endelige plan

    return (

        <View style={styles.container}>

            <Text style={styles.title}>
                {city}, {country}
            </Text>


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


            <Text style={styles.sectionTitle}>
                Din vejertilpassede rejseplan
            </Text>


            <FlatList

                data={plan}

                keyExtractor={(item) => item.id}

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

                                {item.rain ? '🌧️' : '☀️'}

                                {' '}

                                Maks. {item.temperature}°C

                            </Text>

                        ) : (

                            <Text style={styles.tripInfo}>
                                Vejrudsigt ikke tilgængelig
                            </Text>

                        )}


                        {item.activities.map(
                            (activity, index) => (

                                <View
                                    style={styles.planItem}
                                    key={index}
                                >

                                    <Text style={styles.planTime}>
                                        {10 + (index * 2)}:00
                                    </Text>

                                    <Text style={styles.planActivity}>
                                        {activity}
                                    </Text>

                                </View>

                            )
                        )}

                    </View>

                )}

            />

        </View>
    );
};

export default ResultScreen;