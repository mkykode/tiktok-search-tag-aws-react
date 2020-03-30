/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import logo from './images/logo.png';
import './App.css';
import Main from './components/Main';
import { ThemeProvider } from 'theme-ui';
import theme from './theme';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header
          sx={{
            maxWidth: '100%',
            height: 'auto'
          }}
          className="App-header"
        >
          <img
            sx={{
              maxWidth: '100%',
              height: 'auto'
            }}
            src={logo}
            className=""
            alt="logo"
          />
        </header>
        <Main />
      </div>
    </ThemeProvider>
  );
}

export default App;
