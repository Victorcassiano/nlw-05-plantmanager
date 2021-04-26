import React from 'react'
import { Text, StyleSheet, Image, TouchableOpacity, View, Dimensions, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import watering from '../assets/watering.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts'

const Welcome: React.FC = () => {
    const navigation = useNavigation()

    function handleStart(){
        navigation.navigate('UserIdentification')
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Gerencie {'\n'}
                    suas plantas de {'\n'}
                    forma fácil</Text>
                <Image source={watering} style={styles.image} resizeMode="contain" />
                <Text style={styles.subTitle}>Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar 😁</Text>
                <TouchableOpacity 
                    style={styles.button} 
                    activeOpacity={0.8}
                    onPress={handleStart}
                >
                    <Text 
                        style={{color: colors.white, fontSize: 20}}
                    >
                        Próximo
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
    },
    title :{
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 38,
        color: colors.heading,
        fontFamily: fonts.heading,
    },
    subTitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 20,
        height: 60,
        paddingHorizontal: 15
    },
    image: {
        height: Dimensions.get('window').width * 0.8,
    }
})

export default Welcome;