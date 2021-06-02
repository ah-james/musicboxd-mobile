import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import AlbumsOverviewContainer from '../containers/AlbumsOverviewContainer'
import ReviewContainer from '../containers/ReviewContainer'
import UserContainer from '../containers/UserContainer'
import EditReviewContainer from '../containers/EditReviewContainer'


const ReviewsNavigator = createStackNavigator({
    AlbumsOverview: AlbumsOverviewContainer,
    ReviewShow: ReviewContainer,
    User: UserContainer,
    EditReview: EditReviewContainer,
})

export default createAppContainer(ReviewsNavigator)