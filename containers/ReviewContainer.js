import React from 'react'
import { View, Text, StyleSheet, Image, Button, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector } from 'react-redux'

import CustomHeaderButton from '../components/CustomHeaderButton'


const ReviewContainer = props => {
    const reviewId = props.navigation.getParam('id')
    const selectedReview = useSelector(state =>
        state.reviews.availableReviews.find(review => review.id === reviewId))
    
    handleEditReview = (id, album) => {
        props.navigation.navigate({routeName: 'EditReview', params: {
            id: id,
            album: album
        }})
    }

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
            <Button title='Edit' accessibilityLabel="Edit Your Album Review" onPress={() => handleEditReview(selectedReview.id, selectedReview.album)} />
        </View>
    )
}

ReviewContainer.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('album'),
        headerRight: () => <HeaderButtons headerButtonComponent={CustomHeaderButton}>
            <Item title='User' iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} onPress={() => {navData.navigation.navigate('User')}} />
        </HeaderButtons>
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