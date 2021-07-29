import React from 'react';
import './App.css';
import {Navbar} from "./components/Navbar/Navbar";
import {BrowserRouter, Route, withRouter} from "react-router-dom"
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./Redux/app-reducer";
import store, {RootReduxStateType} from "./Redux/redux-store";
import {Preloader} from "./components/common/prelouder/Preloader";

type AppPropsType = {
    initializeApp: () => void
    initialized: boolean
}

class App extends React.Component<AppPropsType, any> {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {

        if (!this.props.initialized) {
            return <Preloader/>
        }
        return (

            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className={'app-wrapper-content'}>
                    <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    <Route path="/users" render={() => <UsersContainer/>}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>
                    <Route path='/login' render={() => <Login/>}/>
                </div>
            </div>

        )
    }
}

type MapStateToPropsType = {
    initialized: boolean
}
const mapStateToProps = (state: RootReduxStateType): MapStateToPropsType => ({
    initialized: state.app.initialized
})
let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}),
)(App);
const SamuraiTSXApp=()=>{
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}
export default SamuraiTSXApp