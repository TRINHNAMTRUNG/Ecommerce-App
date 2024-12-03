import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import EditInputScreen from '../../components/Information/editInfor';
import { memo } from 'react';

const EditInforPage = ({navigation, route}) => {
    return (
    <View contentContainerStyle={styles.container}>
      <EditInputScreen route = {route} navigation = {navigation}/>
    </View>
    );
};

const styles = StyleSheet.create({
  
});

export default memo(EditInforPage);
