import React from "react";
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {
    getStatus,
    getUserProfile,
    ProfileType,
    savePhoto,
    saveProfile,
    updateStatus
} from "../../Redux/profile-reducer";
import {RootReduxStateType} from "../../Redux/redux-store";
import {Preloader} from "../common/prelouder/Preloader";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


type ProfileContainerPropsType = {
    getUserProfile: (userId: number) => void
    profile: ProfileType | null
    getStatus: (userId: number) => void
    status: string
    updateStatus: (status: string) => void
    authorizedUserId: number
    savePhoto: (file: File) => void
    saveProfile:(profile:ProfileType)=>void
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

    refreshProfile() {
        let userId = +this.props.match.params.userId;

        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push("/login")
            }
        }

        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {

        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<WithRoutePropsType>, prevState: Readonly<ProfileContainerStateType>, snapshot?: string) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {

        return this.props.profile ? <Profile profile={this.props.profile}
                                             status={this.props.status}
                                             updateStatus={this.props.updateStatus}
                                             isOwner={!this.props.match.params.userId}
                                             savePhoto={this.props.savePhoto}
                                             saveProfile={this.props.saveProfile}
        /> : <Preloader/>
    }
}

let mapStateToProps = (state: RootReduxStateType) => (
    {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id,
        isAuth: state.auth.isAuth,
    }
)


export default compose<React.ComponentType>(connect(mapStateToProps, {
        getUserProfile,
        getStatus,
        updateStatus,
        savePhoto,saveProfile
    }),
    withRouter,
    withAuthRedirect)
(ProfileContainer)

