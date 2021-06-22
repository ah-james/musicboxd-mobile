import React, { useCallback, useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Button, Alert, ActivityIndicator, ScrollView } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import CustomHeaderButton from '../components/CustomHeaderButton'
import UserReviewCard from '../components/UserReviewCard'
import * as reviewActions from '../store/actions/reviewActions'
import Colors from '../constants/Colors'


const UserContainer = props => {
    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const userReviews = useSelector(state => state.reviews.userReviews)
    const dispatch = useDispatch()

    const loadReviews = useCallback(async () => {
        setIsRefreshing(true)
        try {
            await dispatch(reviewActions.fetchReviews())
        } catch (error) {
            console.log(error.message)
        }
        setIsRefreshing(false)
    }, [dispatch, setIsRefreshing])

    useEffect(() => {
        setIsLoading(true)
        loadReviews().then(() => {
            setIsLoading(false)
        })
    }, [dispatch, loadReviews])

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

    if (isLoading) {
        return(
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primaryColor} />
            </View>
        )
    }
    
    // same userReviews flow as in Overview
    if (userReviews.length === 0) {
        return(
            <View style={styles.centered}>
                <Text>No Reviews Found</Text>
            </View>
        )
    }

    return( 
        <FlatList onRefresh={loadReviews} refreshing={isRefreshing} data={userReviews} renderItem={itemData => (
            <UserReviewCard 
                id={itemData.item.id}
                imageUrl={itemData.item.imageUrl}
                album={itemData.item.album}
                artist={itemData.item.artist}
                rating={itemData.item.rating}
                user={itemData.item.userId}
                handleSelect={() => handleEditReview(itemData.item.id)}
                handleDelete={() => handleDelete(itemData.item.id)}
            />  
        )}/>
    )
}



UserContainer.navigationOptions = navData => {
    return {
        headerTitle: 'Your Reviews',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {navData.navigation.toggleDrawer()}} />
        </HeaderButtons>,
        headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Add" iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'} onPress={() => {navData.navigation.navigate('EditReview')}} />
        </HeaderButtons>,
    }
}


const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default UserContainer