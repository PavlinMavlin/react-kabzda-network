import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom"
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import {ActionTypes, StoreType} from "./Redux/Store";
import {DialogsContainer} from "./components/Dialogs/DialogsContainer";
import {ReduxStoreType} from "./Redux/redux-store";

type AppPropsType = {
    store: ReduxStoreType
    dispatch: (action: ActionTypes) => void
}


const App = (props: AppPropsType) => {



    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className={'app-wrapper-content'}>
                    <Route path='/dialogs' render={() => <DialogsContainer store={props.store}/>}/>

                    <Route path='/profile' render={() => <Profile  store={props.store} />}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/music' render={() => <Music/>}/>


                </div>
            </div>
        </BrowserRouter>
    )
}
export default App;
