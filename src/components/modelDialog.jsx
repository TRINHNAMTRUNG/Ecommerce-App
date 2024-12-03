import React, { createContext, useState, useContext } from 'react';
import { Modal, StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faExclamation, faCheck } from '@fortawesome/free-solid-svg-icons';
// Tạo Context
const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");  // Thêm kiểu loại modal
    const MODAL_TYPES = ['success', 'error']; // Các kiểu hợp lệ

    const openModal = (msg, modalType = "") => {
        if (!MODAL_TYPES.includes(modalType)) {
            console.error("Invalid modal type! Must be 'success' or 'error'.");
            return; // Ngừng thực thi nếu type không hợp lệ
        }
        setMessage(msg);
        setType(modalType);  // Cập nhật kiểu modal
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            <ModelAccept
                message={message}
                showModal={showModal}
                onClose={closeModal}
                type={type}  // Truyền type vào ModelAccept
            />
        </ModalContext.Provider>
    );
};

const ModelAccept = ({ message, showModal, onClose, type }) => {
    return (
        <Modal
            transparent={true}
            visible={showModal}
            animationType="fade"
        >
            <View style={styles.centerView}>
                <View style={[styles.container, { shadowColor: type === 'success' ? "#0CBF59" : "#F53F3E", elevation: 10 }]}>
                    <View style={[styles.iconContainer, { backgroundColor: type === 'success' ? "#F3FCF7" : "#FEF6F4" }]}>
                        <View style={{ width: 50, height: 50, borderRadius: 50, borderWidth: 2, borderColor: type === 'success' ? "#0CBF59" : "#F53F3E", justifyContent: "center", alignItems: "center", marginVertical: 35 }}>
                            {type === 'success' ?
                                <FontAwesomeIcon icon={faCheck} size={30} color={'#0CBF59'} />
                                :
                                <FontAwesomeIcon icon={faExclamation} size={30} color={'#F53F3E'} />
                            }
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 40, alignItems: "center" }}>
                        <Text style={[styles.title]}>
                            {type === 'success' ? 'Hoàn thành rồi!' : 'Có lỗi xảy ra!'}
                        </Text>
                        <Text style={styles.message}>{message}</Text>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: type === 'success' ? "#0CBF59" : "#F53F3E", shadowColor: type === 'success' ? "#0CBF59" : "#F53F3E", elevation: 10 }]}
                            onPress={onClose}
                        >
                            <Text style={{ fontSize: 15, color: "white", fontWeight: "600" }}>
                                {type === 'success' ? 'Tiếp tục' : 'Đã hiểu'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    centerView: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 25,
        paddingBottom: 40,
        width: 300,
    },
    iconContainer: {
        marginBottom: 20,
        width: "100%",
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        fontSize: 50,
        color: '#ff4d4d',
    },
    title: {
        fontSize: 24,
        color: '#333',
        marginBottom: 10,
    },
    message: {
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: "70%",
        alignItems: "center",
        textTransform: 'uppercase',
    }
});

export { ModelAccept };
