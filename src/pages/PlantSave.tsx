import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { SvgFromUri } from 'react-native-svg'
import { useRoute, useNavigation } from '@react-navigation/core'
import DataTimePicker, { Event }  from '@react-native-community/datetimepicker'

import { format, isBefore } from 'date-fns';
import { PlantProps, savePlant } from '../libs/storage';

import waterDrop from '../assets/waterdrop.png'
import Button from '../components/Button';
import Colors from '../styles/colors';
import Fonts from '../styles/fonts';

interface Params {
    plant: PlantProps
}

const PlantSave: React.FC = () => {
    const { navigate } = useNavigation()

    const [selectedDataTime, setSelectedDataTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');

    const route = useRoute();
    const { plant } = route.params as Params;

    async function handleSave() {

        try {
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDataTime,
            })

            navigate('Confirmation', {
                title: 'Tudo certo',
                subTitle: 'Fique tranquilo que sempre vamos lembrar você',
                buttonTitle: 'Muto obrigado 😊',
                icon: 'hug',
                navigator: 'MyPlants'
            })

        } catch {
            Alert.alert('Não foi possível salvar. 😅')
        }
    }

    function handleChangeTime(event: Event, dateTime: Date | undefined){
        if(Platform.OS === 'android'){
            setShowDatePicker(oldState => !oldState)
        }

        if (dateTime && isBefore(dateTime, new Date())) {
            setSelectedDataTime(new Date());
            return Alert.alert('Escolha uma hora futura! ⏰')
        }

        if(dateTime) setSelectedDataTime(dateTime)
        
    }

    return (
        <View style={styles.conteiner}>
            <View style={styles.plantInfo}>
                <SvgFromUri
                    uri={plant.photo}
                    height={150}
                    width={150}
                />

                <Text style={styles.plantName}>
                    {plant.name}
                </Text>
                <Text style={styles.plantAbout}>
                    {plant.about}
                </Text>

            </View>
            <View style={styles.controller}>
                <View style={styles.tipContainer}>
                    <Image source={waterDrop} style={styles.tipImage}/>
                    <Text style={styles.tipText}>
                        {plant.water_tips}
                    </Text>
                </View>
                <Text style={styles.tipText}>

                </Text>
                <Text style={styles.alertLabel}>
                    Escolha o melhor horário para ser lembrado:
                </Text>
                {showDatePicker && (
                    <DataTimePicker
                        value={selectedDataTime}
                        mode="time"
                        display="spinner"
                        
                        onChange={handleChangeTime}
                    />
                )}

                {Platform.OS === 'android' && (
                    <TouchableOpacity
                        style={styles.dateTimePickerButton} 
                        onPress={() => setShowDatePicker(oldState => !oldState)}
                    >
                        <Text style={styles.dateTimePickerText}>
                            {`Mudar ${format(selectedDataTime, 'HH:mm')}`}
                        </Text>
                    </TouchableOpacity>
                )}

         

                <Button title="Cadastrar planta" onPress={() => handleSave()} />
            </View>
        </View>
    );
}
 

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        justifyContent: 'space-between',
        color: Colors.shape,
    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.shape,
    },
    controller: {
        backgroundColor: Colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20,

    },
    plantName: {
        fontFamily: Fonts.heading,
        fontSize: 24,
        color: Colors.heading,
        marginTop: 15,
    },
    plantAbout: {
        textAlign: 'center',
        fontFamily: Fonts.text,
        fontSize: 17,
        color: Colors.heading,
        marginTop: 10,
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: Colors.blue_light,
        padding: 20,
        bottom: 60,
    },
    tipImage: {
        width: 56,
        height: 56,
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: Fonts.text,
        color: Colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: Fonts.complement,
        color: Colors.heading,
        fontSize: 12,
        marginBottom: 5,
    },
    dateTimePickerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,
    },
    dateTimePickerText: {
        color: Colors.heading,
        fontSize: 24,
        fontFamily: Fonts.text
    }
})

export default PlantSave;