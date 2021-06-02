import React from 'react'
import { FlatList, Platform } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import REVIEWS from '../data/dummy-data'
import ReviewCard from '../components/ReviewCard'
import CustomHeaderButton from '../components/CustomHeaderButton'

const AlbumsOverviewContainer = props => {


    const handleSelect = (id, album) => {
        props.navigation.navigate({ routeName: 'ReviewShow', params: {
            id: id,
            album: album
        } })
    }

    return(
        <FlatList data={REVIEWS} renderItem={itemData => 
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
        headerRight: () => <HeaderButtons headerButtonComponent={CustomHeaderButton}>
            <Item title='User' iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} onPress={() => {navData.navigation.navigate('User')}} />
        </HeaderButtons>
    }
}

export default AlbumsOverviewContainer