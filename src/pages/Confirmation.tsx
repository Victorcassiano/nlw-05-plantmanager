import React from 'react'
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Button from '../components/Button'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface Params {
    title: string;
    subTitle: string;
    buttonTitle: string;
    icon: 'smile' | 'hug';
    navigator: string;
}

const emojis = {
    hug: '🥳',
    smile: '😄'
}

const Confirmation: React.FC = () => {
    
    const { reset } = useNavigation()
    const routes = useRoute()

    const {
        title,
        subTitle,
        buttonTitle,
        icon,
        navigator
    } = routes.params as Params

    function handleMoveOn(){
        reset({index: 0, routes: [{name: navigator}]})
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    {emojis[icon]}
                </Text>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.subtitle}>
                    {subTitle}
                </Text>
                <View style={styles.footer}>
                    <Button title={buttonTitle} onPress={handleMoveOn} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    }, 
    content:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 20
    },
    title: {
        fontSize: 22,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        marginTop: 15,
    },
    subtitle: {
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 17,
        paddingHorizontal: 10,
        color: colors.heading
    },
    emoji: {
        fontSize: 80,
    },
    footer: {
        width: '100%',
        paddingHorizontal: 50,
        paddingTop: 25
    }
    
})

export default Confirmation;