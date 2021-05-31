import React from 'react'
import { FlatList } from 'react-native'

import REVIEWS from '../data/dummy-data'
import ReviewCard from '../components/ReviewCard'

const AlbumsOverviewContainer = props => {


    const handleSelect = () => {
        props.navigation.navigate({ routeName: 'ReviewShow' })
    }

    return(
        <FlatList data={REVIEWS} renderItem={itemData => 
            <ReviewCard
                imageUrl={itemData.item.imageUrl}
                album={itemData.item.album}
                artist={itemData.item.artist}
                rating={itemData.item.rating}
                user={itemData.item.userId}
                handleSelect={handleSelect}
            />
        }/>
    )
}

AlbumsOverviewContainer.navigationOptions = {
    headerTitle: 'All Reviews'
}

export default AlbumsOverviewContainer