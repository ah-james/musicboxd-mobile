import React, { useEffect, useReducer } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

const INPUT_CHANGE = 'INPUT_CHANGE'
const INPUT_BLUR = 'INPUT_BLUR'

// create inputReducer for useReducer
const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid,
            }
        case INPUT_BLUR:
            return {
                ...state,
                touched: true,
            }
        default:
            return state
    }
}

const Input = props => {
    // useReducer because state is complex
    const [inputState, dispatch] = useReducer(inputReducer, {
        // inputState.value returns prop filler text depending on if edit
        value: props.initialValue ? props.initialValue : '',
        // isValid checks if input field is valid
        isValid: props.initiallyValid,
        // checks if text field has been touched
        touched: false
    })

    // use onInputChange and id without calling props
    const { onInputChange, id } = props

    // useEffect for side-effect running after render
    useEffect(() => {
        if (inputState.touched) { // if touched is true
            // onInputChange from props
            onInputChange(id, inputState.value, inputState.isValid)
        }
        // dependancies
    }, [inputState, onInputChange, id])

    const handleLostFocus = () => {
        // dispatches INPUT_BLUR to change type to true
        dispatch({type: INPUT_BLUR})
    }

    const handleTextChange = text => {
        // initially set isValid to true
        let isValid = true
        // if required is passed down and no text is passed in then not valid
        if (props.required && text.length === 0) {
            isValid = false
        }
        dispatch({type: INPUT_CHANGE, value: text, isValid: isValid})
    }

    return(
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput {...props} style={styles.input} value={inputState.value} onChangeText={handleTextChange} onBlur={handleLostFocus} />
            {!inputState.isValid && inputState.touched && 
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{props.errorText}</Text>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({

})

export default Input