import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserProvider } from "./componentes/contexts/UserContext/UserContext.js";
import { SubjectProvider } from './componentes/contexts/SubjectContext/SubjectContext';
import CommonProvider  from './componentes/contexts/CommonContext/CommonContext.js';
import LoadingSpinner from './componentes/elements/loading/LoadingSpinner.js';
import ScreenMessage from './componentes/elements/screen_message/ScreenMessage.js';
import './index.css'
ReactDOM.render(
  <React.StrictMode>
    <CommonProvider>
      <UserProvider>
        <SubjectProvider>
          <App />
          <ScreenMessage></ScreenMessage>
          <LoadingSpinner></LoadingSpinner>
        </SubjectProvider>
      </UserProvider>
    </CommonProvider>
  </React.StrictMode>,
  document.getElementById('root')
);