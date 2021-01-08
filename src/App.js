import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import InfinitScroll from './Components/infiniteScroll';
import './App.css';

class App extends Component {
 
  render(){
    return (
      <div className="App">
        <InfinitScroll/>
      </div>
     
    );
  }
  
}

export default App;
