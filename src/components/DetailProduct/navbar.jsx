import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
const HeaderNav = ({ isSearchVisible }) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.headerContainer, { backgroundColor: isSearchVisible ? 'white' : 'rgba(255, 255, 255, 0.7)' }]}>
      <TouchableOpacity onPress={() => { navigation.goBack() }}>
        <Icon name="angle-left" size={20} color="black" />
      </TouchableOpacity>

      <View style={styles.middleSpacer} />

      <View style={styles.rightIcons}>
        <TouchableOpacity>
          <Icon name="cart-shopping" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.ellipsisIcon}>
          <Icon name="ellipsis" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    paddingTop: 32,
    top: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'space-between',
    zIndex: 98,
    transition: 'background-color 0.3s ease',  // Optional for smooth transition
  },
  middleSpacer: {
    flex: 1,
    alignItems: 'center',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ellipsisIcon: {
    marginLeft: 17,
  },
});

export default HeaderNav;
