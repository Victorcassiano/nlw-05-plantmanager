import React from 'react'
import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProps } from  'react-native-gesture-handler'


import Colors from '../styles/colors';
import Fonts from '../styles/fonts';

interface EnvironmentProps extends RectButtonProps {
    title: string;
    active?: boolean;
}

const EnvironmentButton: React.FC<EnvironmentProps> = ({
    title, 
    active = false, 
    ...rest
}) => {
    return(
        <RectButton 
            style={[
                styles.container, 
                active && styles.containerActive
            ]} 
            {...rest}
        >
            <Text 
                style={[
                    styles.text, active && styles.textActive
                ]}
            >
                {title}
            </Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.shape,
        width: 75,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 10
    },
    containerActive: {
        
        backgroundColor: Colors.green_light,
    },
    text: {
        color: Colors.heading,
        fontFamily: Fonts.text
    },
    textActive: {
        fontFamily: Fonts.heading,
        color: Colors.green_dark,
    }
})

export default EnvironmentButton;