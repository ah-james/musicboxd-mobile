import React, { useEffect } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'

import Colors from '../constants/Colors';
import * as authActions from '../store/actions/authActions'

const StartupContainer = props => {

    const dispatch = useDispatch()

    //run logic when component mounts
    useEffect(() => {
        const tryLogin = async () => {
            // use async await here because AsyncStorage is async
            const userData = await AsyncStorage.getItem('userData')
            // if userData does not exist
            if (!userData) {
                // navigate to authContainer
                props.navigation.navigate('Auth')
                return
            }
            const transformedData = JSON.parse(userData)
            // extract userData information
            const { token, userId, expirationDate } = transformedData
            // change expirationDate from string back to Date
            const expireDate = new Date(expirationDate)

            //if expireDate is in the past or token or userId doesn't exist
            if (expireDate <= new Date() || !token || !userId) {
                // navigate to login/signup screen
                props.navigation.navigate('Auth')
                return
            }

            props.navigation.navigate('Reviews')
            dispatch(authActions.authenticate(token, userId))
        }
        tryLogin()
    }, [dispatch])

    return <View style={styles.screen}>
        <ActivityIndicator size='large' color={Colors.primaryColor} />
    </View>
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default StartupContainer