import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import AlbumsOverviewContainer from '../containers/AlbumsOverviewContainer'
import ReviewContainer from '../containers/ReviewContainer'
import UserContainer from '../containers/UserContainer'


const ReviewsNavigator = createStackNavigator({
    AlbumsOverview: AlbumsOverviewContainer,
    ReviewShow: ReviewContainer,
    User: UserContainer,

})

export default createAppContainer(ReviewsNavigator)