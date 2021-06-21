import React from 'react'
import { TouchableOpacity, TouchableNativeFeedback, View, Image, Text, Platform, StyleSheet } from 'react-native'

import Card from '../components/Card'

const ReviewCard = props => {
    let TouchableComponent = TouchableOpacity

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComponent = TouchableNativeFeedback
    }

    return(
        <Card style={styles.review}>
            <View style={styles.touchableComponent}>
                <TouchableComponent onPress={props.handleSelect}>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{uri: props.imageUrl}} />
                        </View>
                        <View style={styles.artistInfo}>
                            <Text style={styles.info}>{props.album}</Text>
                            <Text>by</Text>
                            <Text>{props.artist}</Text>
                            <Text>{props.rating}/10</Text>
                            {/* <Text>By {props.user}</Text> */}
                        </View>
                        <View>
                            {props.children}
                        </View>
                    </View>
                </TouchableComponent>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    review: {
        height: 325,
        margin: 10,
    },
    reviewContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '75%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        overflow: 'hidden',
        marginTop: 5,
    },
    image: {
        width: 200,
        height: '100%',
    },
    artistInfo: {
        alignItems: 'center',
        height: '13%',
        // padding: 5,
    },
    score: {
        textAlign: 'center',
        fontSize: 14,
        color: '#888'
    },
    touchableComponent: {
        overflow: 'hidden',
        borderRadius: 10,
    },
    info: {
        fontSize: 18,
        marginVertical: 2,
    }
})

export default ReviewCard