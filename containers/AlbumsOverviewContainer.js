import React from 'react'
import { TouchableComponent, TouchableNativeFeedback, Platform, View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Platform } from 'react-native'

import REVIEWS from '../data/dummy-data'


const AlbumsOverviewContainer = props => {
    let TouchableComponent = TouchableOpacity

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComponent = TouchableNativeFeedback
    }

    const handleSelect = () => {
        props.navigation.navigate({ routeName: 'ReviewShow' })
    }

    return(
        <FlatList data={REVIEWS} renderItem={itemData => 
            <View style={styles.reviewContainer}>
                <TouchableComponent onPress={handleSelect}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{uri: itemData.item.imageUrl}} />
                    </View>
                    <View style={styles.artistInfo}>
                        <Text>{itemData.item.album} by {itemData.item.artist}</Text>
                    </View>
                    <View style={styles.score}>
                        <Text>{itemData.item.rating}/10</Text>
                    </View>
                </TouchableComponent>
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
    },
    // imageContainer: {
    //     width: '100%',
    //     height: '100%',
    // },
    // image: {
    //     width: '75%',
    //     height: '100%'
    // }
})

export default AlbumsOverviewContainer