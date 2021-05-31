import REVIEWS from '../../data/dummy-data'
import Review from '../../models/review'

// +
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_REVIEWS:
            return {
                availableReviews: action.reviews,
                userReviews: action.userReviews
            }
    }
}