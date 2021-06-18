import React from 'react'
import { SafeAreaView, Button, View, Platform } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import { useDispatch } from 'react-redux'

import AlbumsOverviewContainer from '../containers/AlbumsOverviewContainer'
import ReviewContainer from '../containers/ReviewContainer'
import UserContainer from '../containers/UserContainer'
import EditReviewContainer from '../containers/EditReviewContainer'
import AuthContainer from '../containers/AuthContainer'
import StartupContainer from '../containers/StartupContainer'
import Colors from '../constants/Colors'
import * as authActions from '../store/actions/authActions'

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor: ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    
}


const ReviewsNavigator = createStackNavigator({
    AlbumsOverview: AlbumsOverviewContainer,
    ReviewShow: ReviewContainer,
}, {
    defaultNavigationOptions: defaultNavOptions
})

const UserNavigator = createStackNavigator({
    UserReviews: UserContainer,
    EditReview: EditReviewContainer
}, {
    defaultNavigationOptions: defaultNavOptions
})

const AppNavigator = createDrawerNavigator({
    Reviews: ReviewsNavigator,
    User: UserNavigator
}, {
    contentComponent: props => {
        const dispatch = useDispatch()
        return <View style={{flex: 1, padding: 20}}>
            <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}} >
                <DrawerItems {...props} />
                <Button title="Logout" color={Colors.primary} onPress={() => {
                    dispatch(authActions.logout())
                    props.navigation.navigate('Auth')
                    }} 
                />
            </SafeAreaView>
        </View>
    }
})

const AuthNavigator = createStackNavigator({
    Auth: AuthContainer
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.secondaryColor: ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.secondaryColor
        
    }
})

const MainNavigator = createSwitchNavigator({
    Startup: StartupContainer,
    Auth: AuthNavigator,
    App: AppNavigator
})

export default createAppContainer(MainNavigator)