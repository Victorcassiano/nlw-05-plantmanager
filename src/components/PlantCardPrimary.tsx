import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SvgFromUri } from 'react-native-svg'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'

import Colors from '../styles/colors'
import Fonts from '../styles/fonts'

interface PlantCardPrimaryProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
    }
}

const PlantCardPrimary: React.FC<PlantCardPrimaryProps> = ({data, ...rest}) => {
    return (
        <RectButton
            style={styles.container}
            {...rest}
        >
            <SvgFromUri uri={data.photo} width={70} height={70}/>
            <Text style={styles.text}>
                {data.name}
            </Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: '45%',
        backgroundColor: Colors.shape,
        borderRadius: 20,
        paddingVertical: 10,
        alignItems: 'center',
        margin: 10,
    },
    text: {
        color: Colors.green_dark,
        fontFamily: Fonts.heading,
        marginVertical: 15,
    }
})

export default PlantCardPrimary;