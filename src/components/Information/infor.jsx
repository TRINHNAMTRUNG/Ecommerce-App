import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const Infor = ({ }) => {
  return (
    <View style={styles.container}>

      <View style={styles.header}>

      </View>

      <View style={styles.profileContainer}>
        <View style={styles.profilePicture}>
          <Image
            source={{
              uri: 'https://storage.googleapis.com/a1aa/image/F0TlmWXjVZ4xI591D9vfS8ZnmxTX8ZNf98mX1ecdwlFP9SinA.jpg',
            }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editIcon} >
            <FontAwesome5 name="pencil-alt" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 60,
    transform: [{ translateY: -12 }],
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 50,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -70,
  },
  profilePicture: {
    width: 150,
    height: 150,
    backgroundColor: '#E3F2FD',
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  editIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#424242',
    borderRadius: 50,
    padding: 5,
  },
});

export default Infor;
