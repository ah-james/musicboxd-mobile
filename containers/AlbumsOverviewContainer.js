import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const AlbumsOverviewContainer = props => {
    return(
        <View style={styles.container}>
            <Text>Albums Overview</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default AlbumsOverviewContainer