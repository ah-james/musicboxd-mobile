import React from 'react'
import { View, Text, StyleSheet, Image, Button } from 'react-native'

import REVIEWS from '../data/dummy-data'

const ReviewContainer = props => {
    const reviewId = props.navigation.getParam('id')
    const selectedReview = REVIEWS.find(review => review.id === reviewId)
    return(
        <View>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: selectedReview.imageUrl}} />
            </View>
            <View style={styles.albumInfo}>
                <Text>{selectedReview.album} by {selectedReview.artist}</Text>
                <Text>{selectedReview.rating}/10</Text>
            </View>
            <View style={styles.textContainer}>
                <Text>{selectedReview.text}</Text>
            </View>
            <Button title='Edit' accessibilityLabel="Edit Your Album Review" onPress={() => props.navigation.navigate('')} />
        </View>
    )
}

ReviewContainer.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('album')
    }
}

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '50%',
        width: '50%',
        margin: 10,
    },
    image: {
        height: '100%',
        width: '100%',
        margin: 10
    }
})

export default ReviewContainer