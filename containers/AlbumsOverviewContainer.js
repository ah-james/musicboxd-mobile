import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import REVIEWS from '../data/dummy-data'

const AlbumsOverviewContainer = props => {
    return(
        <FlatList data={REVIEWS} renderItem={itemData => 
            <View style={styles.reviewContainer}>
                <View style={styles.artistInfo} >
                    <Text>{itemData.item.album} by {itemData.item.artist}</Text>
                </View>
            </View>
        }/>
    )
}

AlbumsOverviewContainer.navigationOptions = {
    headerTitle: 'All Reviews'
}

const styles = StyleSheet.create({
    reviewContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default AlbumsOverviewContainer