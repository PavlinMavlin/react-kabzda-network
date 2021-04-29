import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import  {addPost, changeNewText} from "./Redux/State"
import state from "./Redux/State"

 export const rerenderEntireTree=()=> {
    ReactDOM.render(
        <React.StrictMode>
            <App
                 state={state}
                 addPost={addPost}
                 changeNewText={changeNewText}
            />
        </React.StrictMode>,
        document.getElementById('root')
    );
}





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();