import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import './index.scss'
import { CookiesProvider } from 'react-cookie';

import Game from './Game'
ReactDOM.render(

    // <Game></Game>,
   <div className={'appContainer'}>

       <CookiesProvider>
           <App style={{width:'100%'}}></App>
       </CookiesProvider>

   </div>,

  document.getElementById('root')
);


