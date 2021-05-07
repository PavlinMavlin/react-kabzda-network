import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom"
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {ActionTypes, DialogsPageType, StoreType} from "./Redux/State";

type AppPropsType = {
    store: StoreType

    // addPost: (postText: string) => void
    // changeNewText: (newText: string) => void
    dispatch: (action: ActionTypes) => void
}


const App = (props: AppPropsType) => {

    const state = props.store.getState()

    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className={'app-wrapper-content'}>
                    <Route path='/dialogs' render={() => <Dialogs dialogs={state.dialogsPage.dialogs}
                                                                  messages={state.dialogsPage.messages}
                                                                  newMessageBody={state.dialogsPage.newMessageBody}
                                                                  dispatch={props.dispatch}
                                                                    />}/>

                    <Route path='/profile' render={() => <Profile newPostText={state.profilePage.newPostText}
                                                                  posts={state.profilePage.posts}
                                                                  dispatch={props.dispatch}
                        //                                               addPost={props.store.addPost.bind(props.store)}
                        //                                               changeNewText={props.store.changeNewText.bind(props.store)}
                    />}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>


                </div>
            </div>
        </BrowserRouter>
    )
}
export default App;
