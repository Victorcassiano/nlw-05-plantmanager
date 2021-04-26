import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SvgFromUri } from 'react-native-svg'
import { RectButton, RectButtonProps, TouchableOpacity } from 'react-native-gesture-handler'
import { MaterialIcons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable'

import Colors from '../styles/colors'
import Fonts from '../styles/fonts'

interface PlantCardSecondaryProps extends RectButtonProps {
    data: {
        name: string;
        photo: string;
        hour: string;
    }
    handleRemove?: () => void;
}


const PlantCardSecondary: React.FC<PlantCardSecondaryProps> = ({data, handleRemove, ...rest}) => {

    const LeftAction = () => (
        <TouchableOpacity 
            activeOpacity={0.8}
            style={styles.leftAction}
            onPress={handleRemove}
        >
            <MaterialIcons name="delete" color="white" size={25}/>
        </TouchableOpacity>
    )

    return (
        <Swipeable
            overshootRight={false}
            renderRightActions={LeftAction}
            onSwipeableRightOpen={()=>{}}
        >
            <RectButton
                style={styles.container}
                {...rest}
                >
                <SvgFromUri uri={data.photo} width={50} height={50}/>
                <Text style={styles.title}>
                    {data.name}
                </Text>

                <View style={styles.details}>
                    <Text style={styles.titleLabel}>
                        Regar às
                    </Text>
                    <Text style={styles.time}>
                        {data.hour}
                    </Text>
                </View>
            </RectButton>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: Colors.shape,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 25,
        marginVertical: 5,
    },
    title: {
        flex: 1,
        color: Colors.heading,
        fontFamily: Fonts.heading,
        marginVertical: 15,  
    },
    details: {
        alignSelf: 'flex-end',
    },
    titleLabel: {
        fontFamily: Fonts.text,
        fontSize: 16,
        color: Colors.body_light,
    },
    time: {
        marginTop: 5,
        fontFamily: Fonts.heading,
        fontSize: 16,
        color: Colors.body_dark,
        alignSelf: 'flex-end',
    },
    leftAction:{
        width: 100,
        height: 80,
        backgroundColor: Colors.red,
        marginTop: 15,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        right: 20,
        paddingLeft: 15,
    }

})

export default PlantCardSecondary;