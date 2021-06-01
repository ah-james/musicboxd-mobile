import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

import REVIEWS from '../data/dummy-data'

const ReviewContainer = props => {
    const reviewId = props.navigation.getParam('id')
    const selectedReview = REVIEWS.find(review => review.id === reviewId)
    return(
        <View>
            <Image style={styles.image} source={{uri: selectedReview.imageUrl}} />
            <Text>{selectedReview.album} by {selectedReview.artist}</Text>
            <Text>{selectedReview.rating}/10</Text>
            <Text>{selectedReview.text}</Text>
        </View>
    )
}

ReviewContainer.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('album')
    }
}

const styles = StyleSheet.create({
    image: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '50%',
        width: '50%',
        marginTop: 10
    }
})

export default ReviewContainer