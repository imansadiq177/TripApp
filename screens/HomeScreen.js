import React from 'react';
import { View, Text, Button } from 'react-native';

import styles from '../styles/GlobalStyles';

const HomeScreen = ({ navigation }) => {

    return (
        <View style={styles.homeContainer}>

            <Text style={styles.homeTitle}>
                Velkommen til TripApp
            </Text>

            <Text style={styles.homeSubtitle}>
                Planlæg din perfekte rejse på få minutter
            </Text>

            <Button
                title="Planlæg min tur"
                onPress={() => navigation.navigate('Plan')}
            />

        </View>
    );
};

export default HomeScreen;