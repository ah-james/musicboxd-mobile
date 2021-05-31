import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import REVIEWS from '../data/dummy-data'

const ReviewContainer = props => {
    // const selectedReview = REVIEWS.find(review => review.id === props)
    return(
        <View>
            <Text>Review Show Page</Text>
        </View>
    )
}

ReviewContainer.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('album')
    }
}

const styles = StyleSheet.create({

})

export default ReviewContainer