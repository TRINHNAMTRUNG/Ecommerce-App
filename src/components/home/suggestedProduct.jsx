import React, { memo, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import CardProduct from './cardProduct';


const SuggestedProduct = ({ listPipelineSec, isLoading, namePipeline }) => {
    const renderItem = ({ item }) => (
        <CardProduct product={item} key={item._id} />
    );
    const renderLoader = () => {
        return (
            <View style={{ marginTop: 13, alignItems: "center", marginBottom: 60 }}>
                <ActivityIndicator size={"large"} color='#1670FF' />
            </View>
        )
    }
    return (
        <View style={styles.containerListProduct}>
            <View style={styles.frameTitleList}>
                <Text style={styles.textNamePipeline}>{namePipeline}</Text>
                <Text style={styles.textShowAll}>Xem tất cả</Text>
            </View>
            <FlatList
                data={listPipelineSec}
                renderItem={renderItem}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                keyExtractor={(item) => item._id}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={isLoading && renderLoader()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    textShowAll: {
        fontSize: 14,
        fontWeight: "500",
        color: "#0A68FF",
    },
    frameTitleList: {
        flex: 1,
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    containerListProduct: {
        width: "100%",
        padding: 16,
        borderTopWidth: 8,
        borderColor: "#EEEEEE",
        backgroundColor: "white"
    },
    textNamePipeline: {
        fontSize: 18,
        fontWeight: "800",
        color: "#FF424E",
    },
});

export default memo(SuggestedProduct);
