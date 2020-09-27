import React, {Component} from 'react';
import './App.css';
import GeoLocation from './Components/GeoLocation';


class App extends Component {

  public render(){

    return (
      <div className="mainDiv">
      <div className="main">
        <GeoLocation />
      </div>
    </div>
  );
}
}

export default App;
