import React from 'react'
import { View, StyleSheet, TextInput, Text, ScrollView } from 'react-native'

const EditReviewContainer = props => {

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
        headerTitle: navData.navigation.getParam('id') ? `Edit Your ${navData.navigation.getParam('album')} Review` : 'Add a New Review'
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