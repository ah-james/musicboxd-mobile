import React from 'react'
import { TouchableOpacity, TouchableNativeFeedback, View, Image, Text, Platform, StyleSheet, Button } from 'react-native'

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
                            <Text style={styles.info}>{props.album} by {props.artist}</Text>
                            <Text>{props.rating}/10</Text>
                            {/* <Text>By {props.user}</Text> */}
                        </View>
                    </View> 
                </TouchableComponent>
                <View style={styles.buttonContainer}>
                    <Button title="Edit" onPress={() => props.handleSelect(props.id)} />
                    <Button title="Delete" onPress={() => props.handleDelete(props.id)} />
                </View>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    review: {
        height: 325,
        margin: 10,
    },
    touchableComponent: {
        overflow: 'hidden',
        borderRadius: 10,
    },
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '70%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        overflow: 'hidden',
        marginTop: 5,
    },
    image: {
        width: '60%',
        height: '100%',
    },
    artistInfo: {
        height: '10%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        height: '15%',
    }
})

export default ReviewCard