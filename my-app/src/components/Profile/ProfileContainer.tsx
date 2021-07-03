import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, ProfileType, updateStatus} from "../../Redux/profile-reducer";
import {RootReduxStateType} from "../../Redux/redux-store";
import {Preloader} from "../common/prelouder/Preloader";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


type ProfileContainerPropsType = {
    getUserProfile: (userId: string) => void
    profile: ProfileType | null
    getStatus: (userId: string) => void
    status: string
    updateStatus: (status: string) => void
    authorizedUserId:string
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
            userId = this.props.authorizedUserId;
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    render() {

        return this.props.profile ? <Profile profile={this.props.profile}
                                             status={this.props.status}
                                             updateStatus={this.props.updateStatus}


        /> : <Preloader/>
    }
}

let mapStateToProps = (state: RootReduxStateType) => (
    {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId:state.auth.id,
        isAuth:state.auth.isAuth,
    }
)


export default compose<React.ComponentType>(connect(mapStateToProps, {getUserProfile,getStatus,updateStatus,}),
    withRouter,
    withAuthRedirect)
(ProfileContainer)

