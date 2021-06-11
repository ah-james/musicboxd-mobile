import React, { useState, useReducer, useEffect, useCallback } from 'react'
import { View, StyleSheet, Text, ScrollView, Alert, ActivityIndicator } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import CustomHeaderButton from '../components/CustomHeaderButton'
import * as reviewActions from '../store/actions/reviewActions'
import Input from '../components/Input'

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

const EditReviewContainer = props => {
    // set loading and error states to check for those
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const id = props.navigation.getParam('id')
    
    //useSelector extracts data from redux state
    const editedReview = useSelector(state => console.log(state.reviews.userReviews)) // find specific review being edited

    const dispatch = useDispatch()

    const [formState, dispatchState] = useReducer(reducer, {
        inputValues: {
            album: editedReview ? editedReview.album : '',
            artist: editedReview ? editedReview.artist : '',
            imageUrl: editedReview ? editedReview.imageUrl : '',
            rating: editedReview ? editedReview.rating : '',
            text: editedReview ? editedReview.text : '',
        },
        inputValidities: {
            album: editedReview ? true : false,
            artist: editedReview ? true : false,
            imageUrl: editedReview ? true : false,
            rating: editedReview ? true : false,
            text: editedReview ? true : false,
        },
        formIsValid: editedReview ? true : false
    })

    // 
    useEffect(() => {
        if (error) {
            Alert.alert('An Error Occurred', error.message, [{ text: 'Okay' }])
        }
    }, [error])

    // useCallback only changes if one of the dependancies change
    const handleSubmit = useCallback(async () => {
        if (!formState.formIsValid) {
            // throw an error that there are errors on the form
            Alert.alert('Fill out the Form', 'Please check your errors on the form', [
                { text: 'Okay' }
            ])
            return
        }
        // if formIsValid is true then set loading to true and set error to null
        setIsLoading(true)
        setError(null)
        try {
            if (editedReview) {
            // run async useDispatch for updated Review
                await dispatch(reviewActions.updateReview(
                    id, 
                    formState.inputValues.album, 
                    formState.inputValues.artist, 
                    formState.inputValues.imageUrl, 
                    formState.inputValues.rating, 
                    formState.inputValues.text
                ))
            } else {
                await dispatch(reviewActions.createReview(
                    formState.inputValues.album, 
                    formState.inputValues.artist, 
                    formState.inputValues.imageUrl, 
                    formState.inputValues.rating, 
                    formState.inputValues.text
                ))
            }
            // go back to previous page after dispatch begins
            props.navigation.goBack()
        } catch (error) {
            setError(error)
        }
        // reset loading to false
        setIsLoading(false)
    // set dependancies
    }, [formState, dispatch, id])

    useEffect(() => {
        props.navigation.setParams({ 'submit': handleSubmit })
    }, [handleSubmit])

    // id, userId, album, artist, imageUrl, rating, text

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

    if (isLoading) {
        <View>
            <ActivityIndicator style={styles.center} size='large' />
        </View>
    }

    return(
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Input
                        style={styles.input}
                        label="Album Title"
                        errorText="Please Enter a Valid Title" 
                        id="album" 
                        required
                        initialValue={''}
                        onInputChange={handleInputChange}
                        initiallyValid={!!editedReview}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Input 
                        style={styles.input}
                        errorText="Please Enter a Valid Name"
                        label="Artist Name"
                        id='artist'
                        required
                        initialValue={''}
                        onInputChange={handleInputChange}
                        initiallyValid={!!editedReview}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Input 
                        style={styles.input}
                        errorText="Please Enter a Valid URL"
                        label="Album Art"
                        id='imageUrl'
                        required
                        initialValue={''}
                        onInputChange={handleInputChange}
                        initiallyValid={!!editedReview}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Input 
                        label="Rating"
                        style={styles.input}
                        errorText="Please Enter a Valid Rating Between 1-10"
                        id='rating'
                        required
                        initialValue={''}
                        onInputChange={handleInputChange}
                        initiallyValid={!!editedReview}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Input 
                        style={styles.input}
                        id='text'
                        label='Review Text'
                        errorText="Please Enter Your Review Text"
                        initialValue={''}
                        onInputChange={handleInputChange}
                        initiallyValid={!!editedReview}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

EditReviewContainer.navigationOptions = navData => {
    const submitFunction = navData.navigation.getParam('submit')
    return {
        headerTitle: navData.navigation.getParam('id') ? `Edit Your ${navData.navigation.getParam('album')} Review` : 'Add a New Review',
        headerRight: () => <HeaderButtons headerButtonComponent={CustomHeaderButton}>
        <Item title='Submit' iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} onPress={submitFunction} />
    </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    inputContainer: {
        width: '100%',
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    label: {
        marginVertical: 8,
    },
})

export default EditReviewContainer