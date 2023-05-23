import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SPLASH_SCREEN } from './ScreenName';
import { Splash } from '../screens/auth';

const Stack = createNativeStackNavigator();

function SplashScreen () {
    return (
        <Stack.Navigator 
            initialRouteName={SPLASH_SCREEN}
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name={SPLASH_SCREEN} component={Splash} />
        </Stack.Navigator>
    )
}

export default SplashScreen;