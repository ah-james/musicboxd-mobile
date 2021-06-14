import React, { useReducer, useCallback, useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Button, ActivityIndicator, Alert } from 'react-native'
import { useDispatch } from 'react-redux'

import Input from '../components/Input'
import Card from '../components/Card'
import * as authActions from '../store/actions/authActions'

const FORM_UPDATE = 'FORM_UPDATE'

const reducer = (state, action) => {
    if (action.type === FORM_UPDATE) {
        const updatedValues = {
            // set variable with all inputValues from state
            ...state.inputValues,
            // add new inputValue from passed in action
            [action.input]: action.value
        }
        const updatedValidities = {
            // set variable with all inputValidities from state
            ...state.inputValidities,
            // add new from passed in action
            [action.input]: action.isValid
        }
        let formIsValid = true
        // loop through each key in updatedValidities object
        for (const key in updatedValidities) {
            formIsValid = formIsValid && updatedValidities[key]
        }
        return {
            formIsValid: formIsValid,
            inputValues: updatedValues,
            inputValidities: updatedValidities,
        }
    }
    return state
}

const AuthContainer = props => {
    // error state to show errors on page
    const [error, setError] = useState()
    // isLoading state to show spinning wheel when form is loading
    const [isLoading, setIsLoading] = useState(false)
    // signup state to determine login vs signup button
    const [isSignup, setIsSignup] = useState(false)
    // reducer to manage complex user signup state
    const [formState, dispatchState] = useReducer(reducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    })

    const dispatch = useDispatch()

    useEffect(() => {
        // if error exists, create an alert with Alert api
        if (error) {
            Alert.alert('An Error Occurred', error, [{ text: 'Okay' }])
        }
    }, [error])

    // use async await bc authActions return promises
    const handleAuth = async () => {
        let action
        if (isSignup) {
            // email and password to authActions.signup in store
            action = authActions.signup(formState.inputValues.email, formState.inputValues.password)
        } else {
             // email and password to authActions.login in store
            action = authActions.login(formState.inputValues.email, formState.inputValues.password)
        }
        setError(null)
        setIsLoading(true)
        try {
            await dispatch(action)
            props.navigation.navigate('Reviews')
        } catch (error) {
            setError(error.message)
            setIsLoading(false)
        }
    }

    const handleInputChange = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchState({
                type: FORM_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            })
        }, [dispatchState]
    )

    return(
        <View style={styles.screen}>
            <Card style={styles.authContainer}>
                <ScrollView>
                    <Input 
                        id='email' 
                        label='E-Mail' 
                        keyboardType='email-address' 
                        required 
                        email 
                        autoCapitalize='none' 
                        errorText='Please enter a valid email address'
                        onInputChange={handleInputChange}
                        initialValue=""
                    />
                    <Input 
                        id='password' 
                        label='Password' 
                        keyboardType='default'
                        secureTextEntry
                        required 
                        minLength={5} 
                        autoCapitalize='none' 
                        errorText='Please enter a valid email password'
                        onInputChange={handleInputChange}
                        initialValue=""
                    />
                    {isLoading ? <ActivityIndicator size='small' /> : <Button title={isSignup ? 'Sign Up' : 'Log In'} onPress={handleAuth} />}
                    <Button title={isSignup ? 'Switch to Log In' : 'Switch to Sign Up'} onPress={() => {
                        // set Signup to the opposite of current state (true to false)
                        setIsSignup(prevState => !prevState)
                    }} />
                </ScrollView>
            </Card>
        </View>
    )
}

AuthContainer.navigationOptions = {
    headerTitle: 'Log In or Sign Up'
}

const styles = StyleSheet.create({

})

export default AuthContainer