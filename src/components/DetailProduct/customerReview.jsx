import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomerReview = ({ onNavigate }) => { // Nhận prop điều hướng từ component cha nếu cần

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Khách hàng đánh giá</Text>
                {/* Thêm logic điều hướng nếu prop onNavigate được truyền */}
                <TouchableOpacity onPress={onNavigate}>
                    <Icon name="chevron-right" size={16} color="#888" />
                </TouchableOpacity>
            </View>

            <View style={styles.rating}>
                <Text style={styles.score}>5</Text>
                <View style={styles.stars}>
                    <Icon name="star" size={20} color="#f5a623" />
                    <Icon name="star" size={20} color="#f5a623" />
                    <Icon name="star" size={20} color="#f5a623" />
                    <Icon name="star" size={20} color="#f5a623" />
                    <Icon name="star" size={20} color="#f5a623" />
                </View>
                <Text style={styles.count}>(1 đánh giá)</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.stars}>
                    <Icon name="star" size={20} color="#f5a623" />
                    <Icon name="star" size={20} color="#f5a623" />
                    <Icon name="star" size={20} color="#f5a623" />
                    <Icon name="star" size={20} color="#f5a623" />
                    <Icon name="star" size={20} color="#f5a623" />
                    <Text style={styles.comment}>Cực kì hài lòng</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={styles.user}>Chi Nguyen</Text>
                <View style={styles.verified}>
                    <Text style={styles.verifiedText}>Đã mua hàng</Text>
                </View>
            </View>

            <View style={styles.actions}>
                <View style={styles.leftActions}>
                    <TouchableOpacity style={styles.action}>
                        <Icon name="thumbs-up" size={16} color="#888" />
                        <Text style={styles.actionText}>Hữu ích</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action}>
                        <Icon name="comment" size={16} color="#888" />
                        <Text style={styles.actionText}>1</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.action}>
                    <Icon name="share" size={16} color="#888" />
                    <Text style={styles.actionText}>Chia sẻ</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 16,
        width: '100%',
        height: 290,
        marginBottom: 280,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    score: {
        fontSize: 36,
        marginLeft: 16,
        marginRight: 16,
        marginVertical: 10,
        fontWeight: 'bold',
    },
    stars: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    count: {
        fontSize: 14,
        color: '#888',
    },
    content: {
        marginTop: 10,
    },
    comment: {
        fontSize: 16,
        paddingLeft: 10,
        fontWeight: '600',
        alignContent: 'center',
        textAlign: 'center',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    user: {
        fontSize: 14,
        marginRight: 10,
    },
    verified: {
        backgroundColor: '#4caf59',
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 3,
        marginRight: 10,
    },
    verifiedText: {
        color: '#fff',
        fontSize: 12,
        textAlign: 'center',
        height: 20,
        width: 100,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    leftActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    action: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    actionText: {
        fontSize: 14,
        color: '#888',
        marginLeft: 5,
    },
});

export default CustomerReview;
