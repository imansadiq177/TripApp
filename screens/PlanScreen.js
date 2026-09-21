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

    //gemmer brugerens input og valg 
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [hotel, setHotel] = useState('');

    const [categories, setCategories] = useState([]);
    const [foodPreference, setFoodPreference] = useState('');
    const [price, setPrice] = useState('');

    //tilføjer eller fjerner en kategori når brugeren trykker på den
    const selectCategory = (category) => {

        if (categories.includes(category)) {
 
            setCategories(
                categories.filter(item => item !== category)
            );

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

                <Text style={styles.title}>
                    Opret din plan
                </Text>

                <Text style={styles.sectionTitle}>
                    Hvor vil du hen?
                </Text>

                <Text style={styles.label}>Land</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Skriv et land"
                    value={country}
                    onChangeText={(text) => setCountry(text)}
                />

                <Text style={styles.label}>By</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Skriv en by"
                    value={city}
                    onChangeText={(text) => setCity(text)}
                />

                <Text style={styles.sectionTitle}>
                    Hvornår skal du afsted?
                </Text>

                <Text style={styles.label}>Fra dato</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Fx 17/10/2026"
                    value={startDate}
                    onChangeText={(text) => setStartDate(text)}
                />

                <Text style={styles.label}>Til dato</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Fx 20/10/2026"
                    value={endDate}
                    onChangeText={(text) => setEndDate(text)}
                />

                <Text style={styles.sectionTitle}>
                    Hvor skal du bo?
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Skriv hotel (valgfrit)"
                    value={hotel}
                    onChangeText={(text) => setHotel(text)}
                />

                <Text style={styles.sectionTitle}>
                    Hvad interesserer dig?
                </Text>

                <Button
                    title={categories.includes('Mad') ? '✓ Mad' : 'Mad'}
                    onPress={() => selectCategory('Mad')}
                />

                {categories.includes('Mad') && foodPreference === '' && (
                    <View style={styles.foodBox}>

                        <Text style={styles.foodTitle}>
                            Hvilken type mad?
                        </Text>

                        <Button
                            title="Halal"
                            onPress={() => setFoodPreference('Halal')}
                        />

                        <Button
                            title="Vegetar"
                            onPress={() => setFoodPreference('Vegetar')}
                        />

                        <Button
                            title="Ingen præference"
                            onPress={() =>
                                setFoodPreference('Ingen præference')
                            }
                        />

                    </View>
                )}

                {foodPreference !== '' && (
                    <Text style={styles.foodChoice}>
                        Madtype: {foodPreference}
                    </Text>
                )}

                <Button
                    title={
                        categories.includes('Seværdigheder')
                            ? '✓ Seværdigheder'
                            : 'Seværdigheder'
                    }
                    onPress={() => selectCategory('Seværdigheder')}
                />

                <Button
                    title={
                        categories.includes('Shopping')
                            ? '✓ Shopping'
                            : 'Shopping'
                    }
                    onPress={() => selectCategory('Shopping')}
                />

                <Button
                    title={
                        categories.includes('Natur')
                            ? '✓ Natur'
                            : 'Natur'
                    }
                    onPress={() => selectCategory('Natur')}
                />

                <Button
                    title={
                        categories.includes('Kultur')
                            ? '✓ Kultur'
                            : 'Kultur'
                    }
                    onPress={() => selectCategory('Kultur')}
                />

                <Text style={styles.sectionTitle}>
                    Prisklasse
                </Text>

                <Button
                    title={price === 'Billig' ? '✓ Billig' : 'Billig'}
                    onPress={() => setPrice('Billig')}
                />

                <Button
                    title={price === 'Mellem' ? '✓ Mellem' : 'Mellem'}
                    onPress={() => setPrice('Mellem')}
                />

                <Button
                    title={price === 'Dyr' ? '✓ Dyr' : 'Dyr'}
                    onPress={() => setPrice('Dyr')}
                />

                <Text style={styles.readyText}>
                    Klar til at lave din rejseplan?
                </Text>

                <Pressable
                    style={styles.planButton}
                    onPress={() =>
                        navigation.navigate('Result', {
                            country: country,
                            city: city,
                            startDate: startDate,
                            endDate: endDate,
                            hotel: hotel,
                            categories: categories,
                            foodPreference: foodPreference,
                            price: price
                        })
                    }
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