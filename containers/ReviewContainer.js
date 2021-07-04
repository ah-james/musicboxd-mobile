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
            <Image style={styles.image} source={{uri: selectedReview.imageUrl}} />
            <Text style={styles.albumTitle}>{selectedReview.album} by {selectedReview.artist}</Text>
            <Text style={styles.rating}>{selectedReview.rating}/10</Text>            
            <Text style={styles.review}>{selectedReview.text}</Text>
        </View>
    )
}

ReviewContainer.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('album'),
        headerRight: () => <HeaderButtons headerButtonComponent={CustomHeaderButton}>
            <Item title='User' iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} onPress={() => {navData.navigation.navigate('UserReviews')}} />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    image: {
        height: '100%',
        width: '100%',
    },
    albumTitle: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
    },
    rating: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
    },
    review: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
    },
})

export default ReviewContainer