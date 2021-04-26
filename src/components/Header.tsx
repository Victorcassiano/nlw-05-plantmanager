import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'


import userImg from '../assets/Victor.png'

import Colors from '../styles/colors'
import Fonts from '../styles/fonts'

const Header: React.FC = () => {
    const [fullname, setFullname] = useState<string>();

    useEffect(() => {
        async function loadStorage() {
          const user = await AsyncStorage.getItem('@storage_user')
          setFullname(user || '')
        }

        loadStorage()

    }, [fullname]);

    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.userName}>Olá,{'\n'}{fullname}</Text>
            </View>
            <Image style={styles.image} source={userImg} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 35,
        marginTop: getStatusBarHeight() + 10,
    },
    image: {
        width: 85,
        height: 85,
        borderRadius: 42.5,
    },
    userName: {
        fontSize: 32,
        color: Colors.heading,
        fontFamily: Fonts.heading,
        lineHeight: 40,
    }

})


export default Header;