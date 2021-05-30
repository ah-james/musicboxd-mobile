import Review from '../models/review'

const REVIEWS  = [
    new Review(
        'r1',
        'u1',
        'Punisher',
        'Phoebe Bridgers',
        'https://m.media-amazon.com/images/I/41JEAEcCF9S._AC_SY450_.jpg',
        9,
        'One of the best albums of 2020'
    ),
    new Review(
        'r2',
        'u1',
        'Van Weezer',
        'Weezer',
        'https://upload.wikimedia.org/wikipedia/en/f/f8/Weezer_-_Van_Weezer.png',
        2,
        `Weezer's past their prime`
    ),
    new Review(
        'r3',
        'u2',
        'Skylight',
        'Pinegrove',
        'https://f4.bcbits.com/img/a2990048774_10.jpg',
        7,
        'A solid second album'
    )
]

// id, userId, album, imageUrl, rating, text

export default REVIEWS