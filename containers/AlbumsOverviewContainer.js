import React from 'react'
import { FlatList } from 'react-native'

import REVIEWS from '../data/dummy-data'
import ReviewCard from '../components/ReviewCard'

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

AlbumsOverviewContainer.navigationOptions = {
    headerTitle: 'All Reviews'
}

export default AlbumsOverviewContainer