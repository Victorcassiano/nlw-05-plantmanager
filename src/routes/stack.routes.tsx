import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '../pages/Welcome';

import colors from '../styles/colors'
import Confirmation from '../pages/Confirmation';
import UserIdentification from '../pages/UserIdentification';
import PlantSave from '../pages/PlantSave';
import MyPlants from '../pages/MyPlants';
import AuthRoutes from './tab.routes';

const StackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => { 
    return(
        <StackRoutes.Navigator 
            headerMode='none'
            screenOptions={{
                cardStyle: {
                    backgroundColor: colors.white,
                }
            }}
        >
            <StackRoutes.Screen name="Welcome" component={Welcome}/>
            <StackRoutes.Screen name="UserIdentification" component={UserIdentification}/>
            <StackRoutes.Screen name="Confirmation" component={Confirmation}/>
            <StackRoutes.Screen name="SelectPlant" component={AuthRoutes}/>
            <StackRoutes.Screen name="PlantSave" component={PlantSave}/>
            <StackRoutes.Screen name="MyPlants" component={AuthRoutes}/>
        </StackRoutes.Navigator>
    )
}

export default AppRoutes;