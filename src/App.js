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
        <header className="App-header">
          <img src={logo} className="" alt="logo" />
        </header>
        <Main />
      </div>
    </ThemeProvider>
  );
}

export default App;
