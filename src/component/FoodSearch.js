import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './foodSearch.css';

const FoodSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const { searchTerm, searchOrder } = location.state || {};

  useEffect(() => {
    const handleSearch = async () => {
      var sparqlQuery = new URLSearchParams();

      sparqlQuery.set("query", `
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX food: <http://www.semanticweb.org/kemthopaul/ontologies/2024/3/foodData#>

        SELECT ?nom ?description ?image
        WHERE {
            ?individu a food:Dish.
            ?individu food:name ?nom .
            ?individu food:description ?description .
            ?individu food:image ?image .
            FILTER(contains(lcase(?nom), lcase("${searchTerm || ''}")) )
        }
        ORDER BY ${searchOrder || 'ASC'}(?name)
      `);

      try {
        const response = await fetch("http://localhost:3030/FoodOntologie/query", {
          method: 'POST',
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: sparqlQuery,
        });
        const data = await response.json();
        setSearchResults(data.results.bindings);
      } catch (error) {
        console.error('Erreur lors de la recherche :', error);
      }
    };

    handleSearch();
  }, [searchTerm, searchOrder]);

  return (
    <div className="food-search-container">
      <h1 style={{ color:'blue'}}> nourriture correspondant</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }} className="search-results">
        {searchResults.map((result, index) => (
          <div key={index} style={{ width: '300px', margin: '10px', textAlign: 'center', backgroundColor: 'rgb(173, 216, 230)', paddingTop: '20px' }} className="food-result">
            <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto' }}>
              <img src={result.image.value + "?raw=true"} alt={result.nom.value} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h3>{result.nom.value}</h3>
            <div>{result.description.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodSearch;
