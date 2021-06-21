import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, FlatList, Platform, StyleSheet, ActivityIndicator } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch, useSelector } from 'react-redux'

import ReviewCard from '../components/ReviewCard'
import CustomHeaderButton from '../components/CustomHeaderButton'
import * as reviewActions from '../store/actions/reviewActions'
import Colors from '../constants/Colors'

const AlbumsOverviewContainer = props => {
    // utilize state to determine if content is loading
    const [isLoading, setIsLoading] = useState(true)
    // errors in state
    const [error, setError] = useState()
    const [isRefreshing, setIsRefreshing] = useState(false)

    const reviews = useSelector(state => state.reviews.availableReviews)
    const dispatch = useDispatch()

    const loadReviews = useCallback(async () => {
        setIsRefreshing(true)
        setError(null)
        try {
            await dispatch(reviewActions.fetchReviews())
        } catch (error) {
            setError(error.message)
        }
        setIsRefreshing(false)
    }, [dispatch, setIsRefreshing, setError])

    // set side-effect
    useEffect(() => {
        // page is loading
        setIsLoading(true)
        // loadReviews runs asynchronously
        loadReviews().then(() => {
            // after loadReviews runs set isLoading to false
            setIsLoading(false)
        })
    }, [dispatch, loadReviews])
    
    const handleSelect = (id, album) => {
        props.navigation.navigate({ routeName: 'ReviewShow', params: {
            id: id,
            album: album
        } })
    }

    // if isLoading in state is true
    if (isLoading) {
        return(
            <View style={styles.centered}>
                {/* spinny wheel */}
                <ActivityIndicator size='large' color={Colors.primaryColor} />
            </View>
        )
    }

    //if there is an error
    if (error) {
        return(
            <View style={styles.center}>
                <Text>Something Went Wrong</Text>
                <Button title='Try Again' onPress={() => loadReviews} color={Colors.primaryColor} />
            </View>
        )
    }

    // if there aren't any reviews
    if (!isLoading && reviews.length === 0) {
        return(
            <View style={styles.centered}>
                <Text>No Reviews Found</Text>
            </View>
        )
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default AlbumsOverviewContainer