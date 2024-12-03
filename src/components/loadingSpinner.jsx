// components/LoadingSpinner.js
import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

const LoadingSpinner = () => {
    const isLoading = useSelector(state => state.loading.spinning);
    console.log("spin ?? ", isLoading);
    return (
        <Spinner
            visible={isLoading}
            textContent={'Loading...'}
            textStyle={{ color: '#0D6AFF' }}
        />
    );
};

export default LoadingSpinner;
