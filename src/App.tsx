import React from 'react';
import logo from './logo.svg';
import './App.scss';
import AnimeList from "./AnimeList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <span>Wellcome</span>
      </header>
      <div className={'anime-list'}>
        <AnimeList />
      </div>
    </div>
  );
}

export default App;
