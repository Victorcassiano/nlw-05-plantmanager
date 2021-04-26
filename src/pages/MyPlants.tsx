import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, FlatList, Alert } from 'react-native';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';

import waterDrop from '../assets/waterdrop.png'
import Header from '../components/Header';
import { loadPlant, PlantProps, removePlant } from '../libs/storage';
import Colors from '../styles/colors';
import Fonts from '../styles/fonts';
import PlantCardSecondary from '../components/PlantCardSecondary';
import Load from '../components/Load';

const MyPlants: React.FC = () => {
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [nextWatered, setNextWatered] = useState('');

    function handleRemove(plant: PlantProps): void  {
        Alert.alert('Remover', `Deseja remover a ${plant.name}?`,[
            {text: 'Não', style: 'cancel'},
            {text: 'Sim', onPress: async () => {
                try {
                    await removePlant(plant.id)
                    
                    setMyPlants((oldData) => (
                        oldData.filter(item => item.id !== plant.id)
                    ))
                } catch (error) {
                    Alert.alert('Não foi possível remover!')
                    console.log(error)
                }
            }},
        ])
    }

    useEffect(() => {
        async function loadStorageData(){
            const plantsStoraged = await loadPlant();

            try {

                const nextTime = formatDistance(
                    new Date(plantsStoraged[0].dateTimeNotification).getTime(), 
                    new Date().getTime(),
                    { locale: pt }
                )
    
                setNextWatered(
                    `Não esqueça de regar a ${plantsStoraged[0].name} em ${nextTime}`
                )
    
                setMyPlants(plantsStoraged)
            } catch (error) {
                throw new Error(error)
            }            
        }

        loadStorageData()
    }, []);

    return (
        <View style={styles.container}>
            <Header />

            {myPlants.length !== 0 && (

                <View style={styles.spotlight}>
                    <Image source={waterDrop} />
                    <Text style={styles.spotlightText}>
                        {nextWatered}
                    </Text>
                </View>
            )}

            <View style={styles.plants}>

                {myPlants.length !== 0 ? (
                    <>
                        <Text style={styles.plantsTitle}>
                            Próximas regadas
                        </Text>
                    
                        <FlatList 
                            data={myPlants}
                            keyExtractor={item => String(item.id)}
                            renderItem={({item}) => (
                                <PlantCardSecondary 
                                    data={item} 
                                    handleRemove={() => handleRemove(item)}
                                />
                            )}
                            showsVerticalScrollIndicator={false}
                        />
                    </>
                ) : (
                    <View style={styles.containerFail}>
                        <Load type="plantFail" />
                        <Text style={styles.textFail}>
                            Você ainda não adicionou nenhuma plantinha 😥
                        </Text>
                    </View>
                )}
                
            </View>
        </View>
    );
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.background,
    },
    spotlight: {
        backgroundColor: Colors.blue_light,
        paddingHorizontal: 20,
        marginHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    spotlightImage: {
        width: 60,
        height: 60,
    },
    spotlightText: {
        flex: 1,
        color: Colors.blue,
        paddingHorizontal: 20,
        textAlign: 'center',
    },
    plants: {
        flex: 1,
        width: '100%',
        marginTop: 25,
        paddingHorizontal: 20,
    },
    plantsTitle :{
        color: Colors.heading,
        fontFamily: Fonts.heading,
        fontSize: 24,
        alignItems: 'flex-start',
    },
    containerFail: {
        height: 350,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textFail: {
        fontFamily: Fonts.heading,
        color: Colors.green_dark,
        fontSize: 22,
        textAlign: 'center',
    }
})

export default MyPlants;