import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F6F8FB',
        paddingHorizontal: 22,
        paddingTop: 30,
        paddingBottom: 30
    },

    homeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F6F8FB',
        paddingHorizontal: 25
    },

    homeTitle: {
        fontSize: 30,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 10
    },

    homeSubtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 25
    },

    title: {
        fontSize: 30,
        fontWeight: '700',
        marginBottom: 8
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 24,
        marginBottom: 12
    },

    label: {
        fontSize: 15,
        fontWeight: '500',
        marginBottom: 6
    },

    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#C8CDD4',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 14,
        marginBottom: 16
    },

    foodBox: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D5D9E0',
        borderRadius: 12,
        padding: 15,
        marginTop: 10,
        marginBottom: 18
    },

    foodTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10
    },

    foodChoice: {
        fontSize: 14,
        marginTop: 6,
        marginBottom: 14
    },

    readyText: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 30,
        marginBottom: 15
    },

    planButton: {
        backgroundColor: '#2563EB',
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 30
    },

    planButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '600'
    },

    date: {
        fontSize: 16,
        marginBottom: 20
    },

    tripInfo: {
        fontSize: 16,
        marginBottom: 8
    },

    planItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#DADADA'
    },

    planTime: {
        fontSize: 16,
        fontWeight: '600',
        width: 70
    },

    planActivity: {
        fontSize: 16,
        flex: 1
    },
    dayContainer: {
        marginBottom: 25
    },
    
    dayTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 8
    },

});

export default styles;