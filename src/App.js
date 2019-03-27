import React, { Component } from 'react';
import './App.css';
import LoanCalculator from './components/LoanCalculator';
import 'react-input-range/lib/css/index.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoanCalculator  />
      </div>
    );
  }
}

export default App;
