import React from 'react'
import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import CustomHeaderButton from '../components/CustomHeaderButton'
import ReviewCard from '../components/ReviewCard'
import * as reviewActions from '../store/actions/reviewActions'

const UserContainer = props => {
    const userReviews = useSelector(state => state.reviews.userReviews)
    const dispatch = useDispatch()

    const handleEditReview = id => {
        props.navigation.navigate({routeName: 'EditReview', params: {
            reviewId: id,
        }})
    }

    const handleDelete = id => {
        Alert.alert('Are you sure?', 'Do you want to delete?', [
            { text: 'No', style: 'default' },
            { text: 'Yes', style: 'destructive', onPress: () => {dispatch(reviewActions.deleteReview(id))}}
        ])
    }

    return <FlatList data={userReviews} renderItem={itemData => (
        <ReviewCard 
            id={itemData.item.id}
            imageUrl={itemData.item.imageUrl}
            album={itemData.item.album}
            artist={itemData.item.artist}
            rating={itemData.item.rating}
            user={itemData.item.userId}
            onSelect={() => handleEditReview(itemData.item.id)}
        >
            <Button title="Edit" onPress={() => handleEditReview(itemData.item.id)} />
            <Button title="Delete" onPress={() => handleDelete(itemData.item.id)} />
        </ReviewCard> 
    )}/>
}

UserContainer.navigationOptions = navData => {
    return {
        headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {navData.navigation.toggleDrawer()}} />
        </HeaderButtons>,
        headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Add" iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'} onPress={() => {navData.navigation.navigate('EditProduct')}} />
        </HeaderButtons>,
    }
}

const styles = StyleSheet.create({

})

export default UserContainer