import { API_KEY } from '../../secret'

export const SIGNUP = 'SIGNUP'

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
        console.log(responseData)
        // dispatch action object
        dispatch({ type: SIGNUP })
    }
}