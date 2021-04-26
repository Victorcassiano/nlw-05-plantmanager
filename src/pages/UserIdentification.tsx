import React, { useState } from 'react'
import { 
    Text, 
    StyleSheet, 
    View, 
    SafeAreaView, 
    TextInput, 
    KeyboardAvoidingView, 
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native'
import { useNavigation } from '@react-navigation/native';

import Button from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts'
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserIdentification: React.FC = () => {
    const navigation = useNavigation()
    
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();

    function handleInputBlur(){
        setIsFocused(false);
        setIsFilled(!!name);
    }
    
    function handleInputFocus(){
        setIsFocused(true);
    }

    function handleInputChange(value: string){
        setIsFilled(!!value);
        setName(value);
    }


    async function handleSubmit(){
        if(!name) return Alert.alert('Me diz como devo chamar você 😥')

        try {
            await AsyncStorage.setItem('@storage_user', name);

            navigation.navigate('Confirmation', {
                title: 'Prontinho',
                subTitle: 'Agora vamos começar a cuidar das suas plantinhas 😀',
                buttonTitle: 'Começar',
                icon: 'smile',
                navigator: 'SelectPlant',
            })
        } catch {
            Alert.alert('Não foi possível salvar seu nome 😥')
        }

    }


    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                style={styles.container} 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>

                                <Text style={styles.emoji} >
                                {isFilled ? '😄' : '😀'}
                                </Text>
                                <Text style={styles.title} >
                                    Como podemos {'\n'}
                                    chamar você?
                                </Text>
                                <TextInput 
                                    style={[
                                        styles.input,
                                        (isFocused || isFilled) && { borderColor: colors.green }
                                    ]} 
                                    placeholder="Digite um nome" 
                                    onBlur={handleInputBlur}
                                    onFocus={handleInputFocus}
                                    onChangeText={handleInputChange}
                                    />
                                <View style={styles.footer}>
                                    <Button title="Confirmar" onPress={handleSubmit}/>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        width: '100%'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 55,
        alignItems: 'center'
    },
    header: {
        alignItems: 'center',
        width: '100%'
    },
    emoji: {
        fontSize: 45,
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center',
    },
    footer: {
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20,
    }
})

export default UserIdentification;