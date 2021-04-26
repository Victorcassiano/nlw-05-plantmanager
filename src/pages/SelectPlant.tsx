import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, SafeAreaView, View, FlatList, ActivityIndicator } from 'react-native'

import api from '../services/api'

import EnvironmentButton from '../components/EnvironmentButton'
import Header from '../components/Header'
import PlantCardPrimary from '../components/PlantCardPrimary'
import Load from '../components/Load'

import Colors from '../styles/colors'
import Fonts from '../styles/fonts'
import { useNavigation } from '@react-navigation/core'
import { PlantProps } from '../libs/storage'


interface EnvironmentListProps {
    key: string;
    title: string;
}


const SelectPlant: React.FC = () => {
    const navigation = useNavigation()

    const [environmentList, setEnvironmentList] = useState<EnvironmentListProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [selected, setSelected] = useState<string>('all')
    const [isLoading, setIsLoading] = useState(true);

    const [page, setPage] = useState(1)
    const [loadingMore, setLoadingMore] = useState(true)

    function handleEnvironmentSelected(environment: string){
        setSelected(environment);

        if(environment == 'all') return setFilteredPlants(plants);

        const filtered = plants.filter(plant => 
            plant.environments.includes(environment)
        )

        setFilteredPlants(filtered)
    }

    function handleFetchMore(distance: number){
        if(distance < 1) return;

        setLoadingMore(true);
        setPage(oldValue => oldValue + 1)
        fetchPlants()
    }

    function handlePlantSelect(plant: PlantProps){
        navigation.navigate('PlantSave', { plant })
    }

    async function fetchEnvironments() {
       const { data } = await api.get('/plants_environments?_sort=title&_order=asc')
       setEnvironmentList([
           {
               key: 'all',
               title: 'Todos',
           },
           ...data
        ])    
    }

    async function fetchPlants() {
       const { data } = await api.get(`/plants?_sort=name&_order=asc`)

        if(!data) return setIsLoading(true)

        if(page > 1) {
            setPlants(oldValue => [...oldValue, ...data])
        }else{
            setPlants(data)      
            setFilteredPlants(data)
        }

       setIsLoading(false)
       setLoadingMore(false)
    }    

    useEffect(()=>{
        fetchEnvironments();
    },[])

    useEffect(()=>{
        fetchPlants();
    },[])


    if(isLoading) return <Load type="loadAnimation" />
 
    return(
        <SafeAreaView style={styles.container}>
            <Header />
            <Text style={styles.title}>
                Em qual ambiente{'\n'}você quer colocar sua planta?
            </Text>
            <View>
                <FlatList
                    data={environmentList}
                    renderItem={({ item }) => (
                        <>
                            <EnvironmentButton 
                                title={item.title} 
                                active={item.key === selected} 
                                onPress={() => handleEnvironmentSelected(item.key)}
                            />
                            {item.title == 'Sala' && <View style={{width: 75, height: 40}} />}
                        </>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.environmentList}
                    keyExtractor={item => String(item.key)}
                    />
            </View>

            <View style={styles.plants}>
                <FlatList 
                    data={filteredPlants}
                    renderItem={({ item }) => (
                        <PlantCardPrimary 
                            data={item} 
                            onPress={() => handlePlantSelect(item)}
                        />
                    )}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    keyExtractor={item => String(item.id)}
                    ListFooterComponent={
                       loadingMore ? <ActivityIndicator color={Colors.green}/> : <></>
                    }
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background
    },
    title: {
        fontSize: 17,
        fontFamily: Fonts.heading,
        color: Colors.heading,
        lineHeight: 20,
        marginTop: 15,
        marginLeft: 40,
    },
    environmentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginHorizontal: 32,
        marginVertical: 32
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center',
    },
})

export default SelectPlant;