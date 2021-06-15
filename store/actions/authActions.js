import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_KEY } from '../../secret'

export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'
export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'

export const authenticate = (token, userId) => {
    return { type: AUTHENTICATE, token: token, userId: userId }
}

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // needs email, password, returnSecureToken
                email: email,
                password: password,
                returnSecureToken: true
            })
        })

        if (!response.ok) {
            throw new Error('Something went wrong')
        }

        // unpack response body, convert from json to JS
        const responseData = await response.json()
        // console.log(responseData)
        // dispatch action object
        dispatch({ type: SIGNUP, token: responseData.idToken, userId: responseData.localId })
        const expirationDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000)
        saveDataToStorage(responseData.idToken, responseData.localId, expirationDate)
    }
}

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // needs email, password, returnSecureToken
                email: email,
                password: password,
                returnSecureToken: true
            })
        })

        if (!response.ok) {
            const errorResponseData = await response.json()
            const errorId = errorResponseData.error.message
            let message = 'Something Went Wrong!'
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found'
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'Your password is not valid'
            }
            throw new Error(message)
        }

        // unpack response body, convert from json to JS
        const responseData = await response.json()
        // console.log(responseData)
        // dispatch action object
        dispatch({ type: LOGIN, token: responseData.idToken, userId: responseData.localId })
        const expirationDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000)
        saveDataToStorage(responseData.idToken, responseData.localId, expirationDate)
    }
}

export const logout = () => {
    return { type: LOGOUT }
}

// login token persists refreshes
const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId,
        expirationDate: expirationDate.toISOString()
    }))
}