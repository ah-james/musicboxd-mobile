import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const EditReviewContainer = props => {
    return(
        <View>
            <Text></Text>
        </View>
    )
}

EditReviewContainer.navigationOptions = navData => {
    return {
        headerTitle: `Edit Your ${navData.navigation.getParam('album')} Review`
    }
}

const styles = StyleSheet.create({

})

export default EditReviewContainer