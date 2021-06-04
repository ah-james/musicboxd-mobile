import Review from '../../models/review'

export const SET_REVIEWS = 'SET_REVIEWS'
export const DELETE_REVIEW = 'DELETE_REVIEW'
export const CREATE_REVIEW = 'CREATE_REVIEW'

export const fetchReviews = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        try {
            const response = await fetch('https://musicboxd-mobile-default-rtdb.firebaseio.com/reviews.json')
            if (!response.ok) {
                throw new Error('Something went wrong!')
            }

            const responseData = await response.json()
            const loadedReviews = []

            for (key in responseData) {
                loadedReviews.push(new loadedReviews(
                    key,
                    responseData[key].userId,
                    responseData[key].album,
                    responseData[key].artist,
                    responseData[key].imageUrl,
                    responseData[key].rating,
                    responseData[key].text
                ))
            }
            dispatch({
                type: SET_REVIEWS, 
                reviews: loadedReviews, 
                userReviews: loadedReviews.filter(review => review.userId === userId)
            })
        } catch (error) {
            throw error
        }
    }
}

export const deleteReview = reviewId => {
    return async (dispatch, getState) => {
        const token = getState().auth.token
        const response = await fetch(`https://musicboxd-mobile-default-rtdb.firebaseio.com/reviews${reviewId}.json?auth=${token}`, {
            method: 'DELETE',
        })

        if (!response.ok) {
            throw new Error('Something Went Wrong!')
        }

        dispatch({
            type: DELETE_REVIEW, 
            reviewId: reviewId
        })
    }
}