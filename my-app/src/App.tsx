import React from 'react';
import './App.css';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {Dialogs} from "./components/Dialogs/Dialogs";
import {BrowserRouter, Route} from "react-router-dom"
import {News} from "./components/News/News";
import {Music} from "./components/Music/Music";
import  {RootStateType} from "./Redux/State";

type AppPropsType={
    state:RootStateType
}


const App = (props:AppPropsType) => {



    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className={'app-wrapper-content'}>
                    <Route path='/dialogs' render={()=><Dialogs dialogs={props.state.dialogsPage.dialogs} messages={props.state.dialogsPage.messages} />}/>
                    <Route path='/profile' render={()=><Profile posts={props.state.profilePage.posts} />}/>
                    <Route path='/news' render={()=><News/>}/>
                    <Route path='/music' render={()=><Music/>}/>



                </div>
            </div>
        </BrowserRouter>
    )
}
export default App;
