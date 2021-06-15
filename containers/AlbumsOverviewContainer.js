import React, { useCallback, useState } from 'react'
import { FlatList, Platform, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch, useSelector } from 'react-redux'

import ReviewCard from '../components/ReviewCard'
import CustomHeaderButton from '../components/CustomHeaderButton'
import * as reviewActions from '../store/actions/reviewActions'

const AlbumsOverviewContainer = props => {
    const [isRefreshing, setIsRefreshing] = useState(false)

    const reviews = useSelector(state => state.reviews.availableReviews)
    const dispatch = useDispatch()

    const loadReviews = useCallback(async () => {
        setIsRefreshing(true)
        try {
            await dispatch(reviewActions.fetchReviews())
        } catch (error) {
            console.log(error)
        }
        setIsRefreshing(false)
    }, [dispatch])
    
    const handleSelect = (id, album) => {
        props.navigation.navigate({ routeName: 'ReviewShow', params: {
            id: id,
            album: album
        } })
    }

    return(
        <FlatList onRefresh={loadReviews} refreshing={isRefreshing} data={reviews} renderItem={itemData => 
            <ReviewCard
                id={itemData.item.id}
                imageUrl={itemData.item.imageUrl}
                album={itemData.item.album}
                artist={itemData.item.artist}
                rating={itemData.item.rating}
                user={itemData.item.userId}
                handleSelect={() => handleSelect(itemData.item.id, itemData.item.album)}
            />
        }/>
    )
}

AlbumsOverviewContainer.navigationOptions = navData => {
    return {
        headerTitle: 'All Reviews',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Menu" iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {navData.navigation.toggleDrawer()}} />
        </HeaderButtons>,
        headerRight: () => <HeaderButtons headerButtonComponent={CustomHeaderButton}>
            <Item title='Add' iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} onPress={() => {navData.navigation.navigate('EditReview')}} />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({

})

export default AlbumsOverviewContainer