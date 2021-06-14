import React, { useReducer, useCallback } from 'react'
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native'
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

    const handleSignup = () => {
        // dispatch user email and password to authActions in store
        dispatch(authActions.signup(formState.inputValues.email, formState.inputValues.password))
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
                    <Button title='Log In' onPress={handleSignup} />
                    <Button title='Sign Up' onPress={() => {}} />
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