import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import AlbumsOverviewContainer from '../containers/AlbumsOverviewContainer'
import ReviewContainer from '../containers/ReviewContainer'
import UserContainer from '../containers/UserContainer'
import EditReviewContainer from '../containers/EditReviewContainer'
import AuthContainer from '../containers/AuthContainer'


const ReviewsNavigator = createStackNavigator({
    AlbumsOverview: AlbumsOverviewContainer,
    ReviewShow: ReviewContainer,
    User: UserContainer,
    EditReview: EditReviewContainer,
})

const AuthNavigator = createStackNavigator({
    Auth: AuthContainer
})

const MainNavigator = createSwitchNavigator({
    Auth: AuthNavigator,
    Reviews: ReviewsNavigator
})

export default createAppContainer(MainNavigator)