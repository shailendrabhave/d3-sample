import './App.css';
import dataset from './Data/treemap-data';
import TreeMap from './Components/TreeMap';



function App() {
  return (
    <div className="container">
      <div className="App">
          <TreeMap width={600} height={400} data={dataset} />
      </div>
    </div>
    
  );
}

export default App;
