import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FoodList from './component/FoodList';
import SparqlQuery from './component/SparqlQuery';
import FoodSearch from './component/FoodSearch';
import Header from './component/Header';

function App() {
  return (
    <Router>
      <div>
        <Header />
        
        <main>
          <Routes>
            <Route path="/foodsearch" element={<FoodSearch />} />
          
            <Route path="/sparqlquery" element={<SparqlQuery />} />
          </Routes>
        </main>
        <FoodList />
       < SparqlQuery />
      </div>
    </Router>
  );
}

export default App;
