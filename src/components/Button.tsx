import React from 'react'
import {  StyleSheet, TouchableOpacity,  Text, TouchableOpacityProps } from 'react-native'

import colors from '../styles/colors';
import Fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
    title: string;
}

const Button: React.FC<ButtonProps> = ({title, ...rest}) =>{
    return(
            <TouchableOpacity 
                style={styles.container} 
                activeOpacity={0.8}
                {...rest}
            >
                <Text style={styles.text}>
                    {title}
                </Text>
            </TouchableOpacity>    
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 20,
        height: 60,
        paddingHorizontal: 15
    },
    text: {
        fontSize: 16,
        color: colors.white,
        fontFamily: Fonts.heading
    }
})

export default Button;