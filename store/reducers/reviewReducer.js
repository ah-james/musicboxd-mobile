import REVIEWS from '../../data/dummy-data'
import Review from '../../models/review'

const initialState = {
    availableReviews = [],
    userReviews = []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_REVIEWS:
            return {
                availableReviews: action.reviews,
                userReviews: action.userReviews
            }
        case DELETE_REVIEW:
            return {
                // spread current state
                ...state, 
                // reset available reviews to filter out review where ID === reviewId
                availableReviews: state.availableReviews.filter(review => review.id !== action.reviewId),
                // same as above with userReviews
                userReviews: state.userReviews.filter(review => review.id !== action.reviewId)
            }
        case CREATE_REVIEW:
            const newReview = new Review(
                action.reviewData.id,
                action.reviewData.userId,
                action.reviewData.album,
                action.reviewData.artist,
                action.reviewData.imageUrl,
                action.reviewData.rating,
                action.reviewData.text
            )
            return { 
                ...state, 
                // concat returns new array combining state and newReview
                availableReviews: state.availableReviews.concat(newReview),
                userReviews: state.availableReviews.concat(newReview),
            }
        case UPDATE_REVIEW:
            const reviewIndex = state.userReviews.findIndex(review => review.id === action.reviewId)
            const updatedReview = new Review(
                action.reviewId,
                state.userReviews[reviewIndex].ownerId,
                action.reviewData.album,
                action.reviewData.artist,
                action.reviewData.album,
                action.reviewData.imageUrl,
                action.reviewData.rating,
                action.reviewData.text
            )
            const updatedUserReviews = [...state.userReviews]
            updatedUserReviews[reviewIndex] = updatedReview
            const availableReviewIndex = state.availableReviews.findIndex(review => review.id === action.reviewId)
            const updatedAvailableReviews = [...state.availableReviews]
            updatedAvailableReviews[availableReviewIndex] = updatedReview
            return {
                ...state,
                availableReviews: updatedAvailableReviews,
                userReviews: updatedUserReviews
            }
        
    }
    return state
}