
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import styles from '../styles/GlobalStyles';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.homeContainer}>

            <View style={styles.homeDecoration}>
                <Ionicons
                    name="airplane"
                    size={185}
                    color="#C7D2FE"
                />
            </View>

            <View style={styles.homeCircleOne} />
            <View style={styles.homeCircleTwo} />

            <View style={styles.homeContent}>

                <View style={styles.homeBadge}>
                    <Ionicons
                        name="earth-outline"
                        size={17}
                        color="#4F46E5"
                    />
                    <Text style={styles.homeBadgeText}>
                        UDFORSK VERDEN
                    </Text>
                </View>

                <Text style={styles.homeTitle}>
                    Din rejse starter her.
                </Text>

                <Text style={styles.homeSubtitle}>
                    Oplev nye destinationer, planlæg dine aktiviteter
                    og få en rejseplan, der passer til dig og vejret.
                </Text>

                <TouchableOpacity
                    style={styles.homeMainButton}
                    activeOpacity={0.85}
                    onPress={() => navigation.navigate('Plan')}
                >
                    <Text style={styles.homeMainButtonText}>
                        Planlæg min tur
                    </Text>

                    <Ionicons
                        name="arrow-forward"
                        size={21}
                        color="#FFFFFF"
                    />
                </TouchableOpacity>

                <View style={styles.homeFeatureRow}>

                    <View style={styles.homeFeature}>
                        <Ionicons
                            name="sunny-outline"
                            size={20}
                            color="#4F46E5"
                        />
                        <Text style={styles.homeFeatureText}>
                            Vejrtilpasset
                        </Text>
                    </View>

                    <View style={styles.homeFeature}>
                        <Ionicons
                            name="map-outline"
                            size={20}
                            color="#4F46E5"
                        />
                        <Text style={styles.homeFeatureText}>
                            Personlig plan
                        </Text>
                    </View>

                </View>

            </View>

        </View>
    );
};

export default HomeScreen;
