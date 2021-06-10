import React from 'react'
import { View, StyleSheet, TextInput, Text, ScrollView } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import CustomHeaderButton from '../components/CustomHeaderButton'

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
            ...state.inputValidities
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

    const [formState, dispatch] = useReducer(reducer, {

    })

    const handleSubmit = () => {

    }

    return(
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Text>Album Title:</Text>
                    <TextInput
                        style={styles.input}
                        id="album" 
                        required
                        initialValue={''}
                        onInputChange={() => {}}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text>Artist Name:</Text>
                    <TextInput 
                        style={styles.input}
                        id='artist'
                        required
                        initialValue={''}
                        onInputChange={() => {}}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text>Album Art:</Text>
                    <TextInput 
                        style={styles.input}
                        id='imageUrl'
                        required
                        initialValue={''}
                        onInputChange={() => {}}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text>Rating:</Text>
                    <TextInput 
                        style={styles.input}
                        id='rating'
                        required
                        initialValue={''}
                        onInputChange={() => {}}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Review Text</Text>
                    <TextInput 
                        style={styles.input}
                        id='text'
                        label='Review Text'
                        initialValue={''}
                        onInputChange={() => {}}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

EditReviewContainer.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('id') ? `Edit Your ${navData.navigation.getParam('album')} Review` : 'Add a New Review',
        headerRight: () => <HeaderButtons headerButtonComponent={CustomHeaderButton}>
        <Item title='Submit' iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} onPress={handleSubmit} />
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