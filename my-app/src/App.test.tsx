import React from 'react';
import SamuraiTSXApp from './App';
import ReactDOM from 'react-dom';

it('renders without crashing', () => {
  const div=document.createElement("div")
  ReactDOM.render(<SamuraiTSXApp/>,div);
  ReactDOM.unmountComponentAtNode(div)
});
