import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, ProfileType} from "../../Redux/profile-reducer";
import {RootReduxStateType} from "../../Redux/redux-store";
import {Preloader} from "../common/prelouder/Preloader";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


type ProfileContainerPropsType = {
    getUserProfile: (userId: string) => void
    profile: ProfileType | null

}

type ProfileContainerStateType = {
    loading: boolean
}

type PathParamsType = {
    userId: string
}

type WithRoutePropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType


class ProfileContainer extends React.Component<WithRoutePropsType, ProfileContainerStateType> {

    constructor(props: WithRoutePropsType) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {

        let userId = this.props.match.params.userId;

        if (!userId) {
            userId = "2";
        }
        this.props.getUserProfile(userId)

    }

    render() {

        return this.props.profile ? <Profile profile={this.props.profile}/> : <Preloader/>
    }
}

let mapStateToProps = (state: RootReduxStateType) => (
    {
        profile: state.profilePage.profile,

    }
)


export default compose<React.ComponentType>(connect(mapStateToProps, {getUserProfile}),
    withRouter,
    withAuthRedirect)
(ProfileContainer)

