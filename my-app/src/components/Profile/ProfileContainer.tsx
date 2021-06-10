import React from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {ProfileType, setUsersProfile} from "../../Redux/profile-reducer";
import {RootReduxStateType} from "../../Redux/redux-store";
import {Preloader} from "../common/prelouder/Preloader";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {profileApi} from "../../api/api";


type ProfileContainerPropsType = {
    setUsersProfile: (profile: ProfileType) => void
    profile: ProfileType | null
}

type ProfileContainerStateType = {
    loading: boolean
}
// type MapStateToPropsType = {
//     profile: ProfileType | null
// }
// type MapDispatchToProps = {
//     setUsersProfile: (profile: ProfileType) => void
// }
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
        console.log(this.props)
        let userId = this.props.match.params.userId;
        console.log(this.props.match.params.userId)
        if (!userId) {
            userId = "2";
        }

        profileApi.getProfile(userId).then(response => {
                this.props.setUsersProfile(response.data)
            }
        )
    }

    render() {
        return this.props.profile ? <Profile profile={this.props.profile}/> : <Preloader/>
    }
}

let mapStateToProps = (state: RootReduxStateType) => (
    {
        profile: state.profilePage.profile
    }
)


let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUsersProfile})(WithUrlDataContainerComponent)