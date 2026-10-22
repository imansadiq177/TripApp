
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F5F9',
        paddingHorizontal: 22,
        paddingTop: 28,
        paddingBottom: 24
    },

    homeContainer: {
        flex: 1,
        backgroundColor: '#F1F5F9',
        justifyContent: 'center',
        paddingHorizontal: 28,
        overflow: 'hidden'
    },

    homeDecoration: {
        position: 'absolute',
        top: '10%',
        right: -35,
        opacity: 0.7,
        transform: [{ rotate: '-25deg' }]
    },

    homeCircleOne: {
        position: 'absolute',
        width: 310,
        height: 310,
        borderRadius: 155,
        backgroundColor: '#E0E7FF',
        top: -145,
        left: -120,
        opacity: 0.65
    },

    homeCircleTwo: {
        position: 'absolute',
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: '#DBEAFE',
        bottom: -120,
        right: -110,
        opacity: 0.65
    },

    homeContent: {
        zIndex: 1,
        paddingTop: 90
    },

    homeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        backgroundColor: '#E0E7FF',
        borderRadius: 30,
        paddingHorizontal: 15,
        paddingVertical: 9,
        marginBottom: 22
    },

    homeBadgeText: {
        fontSize: 11,
        fontWeight: '800',
        color: '#4F46E5',
        letterSpacing: 1.5,
        marginLeft: 8
    },

    homeTitle: {
        fontSize: 40,
        fontWeight: '800',
        color: '#0F172A',
        letterSpacing: -1.5,
        lineHeight: 48,
        marginBottom: 20
    },

    homeSubtitle: {
        fontSize: 16,
        color: '#64748B',
        lineHeight: 27,
        marginBottom: 35
    },

    homeMainButton: {
        backgroundColor: '#4F46E5',
        borderRadius: 18,
        paddingVertical: 19,
        paddingHorizontal: 23,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#4F46E5',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.24,
        shadowRadius: 14,
        elevation: 5
    },

    homeMainButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '800'
    },

    homeFeatureRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 32,
        gap: 12
    },

    homeFeature: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        paddingVertical: 14,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#E2E8F0'
    },

    homeFeatureText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#475569',
        marginLeft: 7
    },

    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#0F172A',
        letterSpacing: -0.9,
        marginBottom: 12
    },

    sectionTitle: {
        fontSize: 19,
        fontWeight: '700',
        color: '#1E293B',
        letterSpacing: -0.3,
        marginTop: 26,
        marginBottom: 16
    },

    label: {
        fontSize: 14,
        fontWeight: '700',
        color: '#334155',
        letterSpacing: 0.2,
        marginBottom: 9
    },

    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 18,
        marginBottom: 18,
        fontSize: 16,
        color: '#0F172A',
        shadowColor: '#64748B',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 1
    },

    foodBox: {
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        padding: 20,
        marginTop: 14,
        marginBottom: 22,
        borderWidth: 1,
        borderColor: '#E8EDF5',
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.05,
        shadowRadius: 16,
        elevation: 3
    },

    foodTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#0F172A',
        marginBottom: 14
    },

    foodChoice: {
        fontSize: 15,
        color: '#475569',
        lineHeight: 23,
        marginTop: 8,
        marginBottom: 15
    },

    readyText: {
        fontSize: 21,
        fontWeight: '800',
        color: '#0F172A',
        letterSpacing: -0.4,
        marginTop: 32,
        marginBottom: 18
    },

    planButton: {
        backgroundColor: '#4F46E5',
        paddingVertical: 18,
        paddingHorizontal: 26,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        shadowColor: '#4F46E5',
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 5
    },

    planButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '800',
        letterSpacing: 0.3
    },

    saveButton: {
        backgroundColor: '#0F172A',
        paddingVertical: 17,
        paddingHorizontal: 24,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 14,
        marginBottom: 25,
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 4
    },

    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 0.2
    },

    date: {
        fontSize: 15,
        fontWeight: '600',
        color: '#64748B',
        marginBottom: 22
    },

    tripInfo: {
        fontSize: 15,
        color: '#475569',
        lineHeight: 24,
        marginBottom: 9
    },

    dayContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#E9EEF5',
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 0.07,
        shadowRadius: 18,
        elevation: 4
    },

    dayTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#0F172A',
        letterSpacing: -0.4,
        marginBottom: 12
    },

    planItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFF',
        borderWidth: 1,
        borderColor: '#E8EDFA',
        borderRadius: 16,
        paddingVertical: 17,
        paddingHorizontal: 15,
        marginTop: 10
    },

    planTime: {
        fontSize: 15,
        fontWeight: '800',
        color: '#4F46E5',
        width: 70
    },

    planActivity: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
        color: '#334155',
        lineHeight: 23
    },

    savedPlanCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        padding: 20,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: '#E9EEF5',
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.06,
        shadowRadius: 14,
        elevation: 3
    },

    savedPlanTitle: {
        fontSize: 21,
        fontWeight: '800',
        color: '#0F172A',
        letterSpacing: -0.3,
        marginBottom: 8
    },

    savedPlanDate: {
        fontSize: 14,
        fontWeight: '500',
        color: '#64748B',
        marginBottom: 14
    },

    deleteButton: {
        backgroundColor: '#FFF1F2',
        borderWidth: 1,
        borderColor: '#FFE4E6',
        borderRadius: 14,
        paddingVertical: 13,
        paddingHorizontal: 18,
        alignItems: 'center',
        marginTop: 14
    },

    deleteButtonText: {
        color: '#E11D48',
        fontSize: 15,
        fontWeight: '700'
    },
    planningOption: {
        backgroundColor: '#F8FAFF',
        borderWidth: 1,
        borderColor: '#E0E7FF',
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 10
    },
    
    planningOptionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#4F46E5',
        marginBottom: 5
    },
});

export default styles;
