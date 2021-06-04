import React from "react";
import {Profile} from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {ProfileType, setUsersProfile} from "../../Redux/profile-reducer";
import {RootReduxStateType} from "../../Redux/redux-store";
import {Preloader} from "../common/prelouder/Preloader";

type ProfileContainerPropsType = {
    setUsersProfile: (profile: ProfileType) => void
    profile: ProfileType | null
}

type ProfileContainerStateType = {
    loading: boolean
}

class ProfileContainer extends React.Component<ProfileContainerPropsType, ProfileContainerStateType> {

    constructor(props: ProfileContainerPropsType) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`).then(response => {

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


export default connect(mapStateToProps, {setUsersProfile})(ProfileContainer)