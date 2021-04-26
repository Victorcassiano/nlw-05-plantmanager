import React from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native'

import loadAnimation from '../assets/load.json'
import plantFail from '../assets/plantFail.json'

interface LoadProps {
    type: 'loadAnimation' | 'plantFail';
}

const Load: React.FC<LoadProps> = ({type}) => {
    return(
        <View style={styles.container}>
            <LottieView 
                source={type == 'plantFail' ? plantFail : loadAnimation} 
                autoPlay 
                loop 
                style={styles.animation}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animation: {
        backgroundColor: 'transparent',
        width: 300,
        height: 300,
    }
})

export default Load;