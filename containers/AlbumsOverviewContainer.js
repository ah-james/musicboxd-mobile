import React from 'react'
import { TouchableNativeFeedback, Platform, View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'

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
                handleSelect={handleSelect}
            />
        }/>
    )
}

AlbumsOverviewContainer.navigationOptions = {
    headerTitle: 'All Reviews'
}

const styles = StyleSheet.create({
    review: {
        height: 300,
        margin: 10,
    },
    reviewContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        width: '100%',
        height: '100%',
    },
    image: {
        width: '75%',
        height: '100%'
    }
})

export default AlbumsOverviewContainer