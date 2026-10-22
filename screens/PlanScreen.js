
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    ScrollView,
    Pressable
} from 'react-native';

import styles from '../styles/GlobalStyles';

const PlanScreen = ({ navigation }) => {
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [hotel, setHotel] = useState('');
    const [categories, setCategories] = useState([]);
    const [foodPreference, setFoodPreference] = useState('');
    const [price, setPrice] = useState('');
    const [dayPercentage, setDayPercentage] = useState(50);

    const selectCategory = (category) => {
        if (categories.includes(category)) {
            setCategories(categories.filter(item => item !== category));

            if (category === 'Mad') {
                setFoodPreference('');
            }
        } else {
            setCategories([...categories, category]);
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Opret din plan</Text>

                <Text style={styles.sectionTitle}>Hvor vil du hen?</Text>

                <Text style={styles.label}>Land</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Skriv et land"
                    value={country}
                    onChangeText={setCountry}
                />

                <Text style={styles.label}>By</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Skriv en by"
                    value={city}
                    onChangeText={setCity}
                />

                <Text style={styles.sectionTitle}>Hvornår skal du afsted?</Text>

                <Text style={styles.label}>Fra dato</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Fx 25/10/2026"
                    value={startDate}
                    onChangeText={setStartDate}
                />

                <Text style={styles.label}>Til dato</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Fx 27/10/2026"
                    value={endDate}
                    onChangeText={setEndDate}
                />

                <Text style={styles.sectionTitle}>Hvor skal du bo?</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Skriv hotel (valgfrit)"
                    value={hotel}
                    onChangeText={setHotel}
                />

                <Text style={styles.sectionTitle}>Hvad interesserer dig?</Text>

                <Button
                    title={categories.includes('Mad') ? '✓ Mad' : 'Mad'}
                    onPress={() => selectCategory('Mad')}
                />

                {categories.includes('Mad') && (
                    <View style={styles.foodBox}>
                        <Text style={styles.foodTitle}>Hvilken type mad?</Text>

                        {['Halal', 'Vegetar', 'Ingen præference'].map(option => (
                            <Button
                                key={option}
                                title={foodPreference === option ? `✓ ${option}` : option}
                                onPress={() => setFoodPreference(option)}
                            />
                        ))}
                    </View>
                )}

                {['Seværdigheder', 'Shopping', 'Natur', 'Kultur'].map(category => (
                    <Button
                        key={category}
                        title={categories.includes(category) ? `✓ ${category}` : category}
                        onPress={() => selectCategory(category)}
                    />
                ))}

                <Text style={styles.sectionTitle}>Prisklasse</Text>

                {['Billig', 'Mellem', 'Dyr'].map(option => (
                    <Button
                        key={option}
                        title={price === option ? `✓ ${option}` : option}
                        onPress={() => setPrice(option)}
                    />
                ))}

                <Text style={styles.sectionTitle}>
                    Hvor meget af dagen vil du planlægge?
                </Text>

                <Text style={styles.tripInfo}>
                    Vælg hvor stor en del af dagen der skal være planlagt.
                    Resten af dagen er fri til spontane aktiviteter.
                </Text>

                <View style={styles.foodBox}>
                    {[25, 50, 75, 100].map(percentage => (
                        <Pressable
                            key={percentage}
                            style={styles.planningOption}
                            onPress={() => setDayPercentage(percentage)}
                        >
                            <Text style={styles.planningOptionTitle}>
                                {dayPercentage === percentage ? '✓ ' : ''}
                                {percentage}% af dagen
                            </Text>

                            <Text style={styles.tripInfo}>
                                {percentage === 25 && 'Kl. 10–13 · Meget fritid'}
                                {percentage === 50 && 'Kl. 10–16 · Halvdelen af dagen fri'}
                                {percentage === 75 && 'Kl. 10–19 · Lidt fritid'}
                                {percentage === 100 && 'Kl. 10–22 · Hele dagen planlagt'}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                <Text style={styles.readyText}>
                    Klar til at lave din rejseplan?
                </Text>

                <Pressable
                    style={styles.planButton}
                    onPress={() => navigation.navigate('Result', {
                        country,
                        city,
                        startDate,
                        endDate,
                        hotel,
                        categories,
                        foodPreference,
                        price,
                        dayPercentage
                    })}
                >
                    <Text style={styles.planButtonText}>
                        Lav min plan
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default PlanScreen;
