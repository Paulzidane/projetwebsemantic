import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FoodList from './component/FoodList';
import SparqlQuery from './component/SparqlQuery';
import FoodSearch from './component/FoodSearch';
import Header from './component/Header';
import AddFood from './component/AddFood';


function App() {
  return (
    <Router>
      <div>
        <Header />
        
        <main>
          <Routes>
            <Route path="/foodsearch" element={<FoodSearch />} />
            <Route path="/sparqlquery" element={<SparqlQuery />} /> 
            <Route path="/addfood" element={<AddFood />} />  
          </Routes>
        </main>
       
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '80%' }}>
            <FoodList />
            <SparqlQuery />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
