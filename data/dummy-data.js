import Review from '../models/review'

const REVIEWS  = [
    new Review(
        'r1',
        'u1',
        'Punisher',
        'Phoebe Bridgers',
        9,
        'One of the best albums of 2020'
    ),
    new Review(
        'r2',
        'u1',
        'Van Weezer',
        'Weezer',
        2,
        `Weezer's past their prime`
    ),
    new Review(
        'r3',
        'u2',
        'Skylight',
        'Pinegrove',
        7,
        'A solid second album'
    )
]

// id, userId, album, imageUrl, rating, text

export default REVIEWS