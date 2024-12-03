import React, { memo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Infor from '../../components/Information/infor';
import ProfileInfo from '../../components/Information/containInfor'
const InforPage = ({ navigation }) => {
    return (
        <ScrollView contentContainerStyle={styles.container} >
            <Infor />
            <ProfileInfo navigation={navigation} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    }
});

export default memo(InforPage);
