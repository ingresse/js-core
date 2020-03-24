import React from 'react';
import trackers from '@ingresse/trackers';
import './App.css';

function App() {
  trackers({
    fbq: {
      key: '',
    },
    gtag: {
      key: '',
    },
    legit: {
      key: '',
    },
  });

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
