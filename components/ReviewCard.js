import React from 'react'

import Card from '../components/Card'

const ReviewCard = props => {
    let TouchableComponent = TouchableOpacity

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComponent = TouchableNativeFeedback
    }

    return(
        <Card style={styles.review}>
                <TouchableComponent onPress={props.handleSelect}>
                    <View style={styles.reviewContainer}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{uri: props.imageUrl}} />
                        </View>
                        <View style={styles.artistInfo}>
                            <Text>{props.album} by {props.artist}</Text>
                        </View>
                        <View style={styles.score}>
                            <Text>{props.rating}/10</Text>
                        </View>
                    </View>
                </TouchableComponent>
            </Card>
    )
}

export default ReviewCard