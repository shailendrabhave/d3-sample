import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import React from 'react';

//import components from './Data/component-list'
//import dataset from './Data/treemap-data'

//import HelloWorld from './Components/HelloWorld'
//import TreeMap from './Components/TreeMap'
//import SVGSample from './Components/SVGSample'
import BarChart from './Components/BarChart'

function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="App col-md-12">          
            <BarChart id="BarChart" />
        </div>
      </div>
    </div>    
  );
}

export default App;
