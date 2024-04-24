import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Importer l'icône de recherche depuis React Icons
import './foodSearch.css';

const FoodSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOrder, setSearchOrder] = useState('ASC'); // État pour stocker l'ordre de recherche, par défaut ASC
  const [searchResults, setSearchResults] = useState([]); // État pour stocker les résultats de la recherche

  const handleSearch = async () => {
    const sparqlQuery = `
      PREFIX foo: <http://filmontology.org/ontology/1.0/>
      PREFIX fo: <http://www.w3.org/1999/XSL/Format#>
      PREFIX owl: <http://www.w3.org/2002/07/owl#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX food: <http://www.semanticweb.org/kemthopaul/ontologies/2024/3/foodData#>
      SELECT DISTINCT ?nom ?description ?image
      WHERE {
        ?individu rdf:type ?food.
        ?individu food:name ?nom .
        OPTIONAL {?individu food:description ?description.}
        OPTIONAL {?individu food:image ?image.}
        FILTER CONTAINS(?nom , "${searchTerm}")
      }
      ORDER BY ${searchOrder}(?nom)
    `;

    // Effectuer la requête SPARQL avec sparqlQuery vers votre endpoint SPARQL
    try {
      const response = await fetch("http://localhost:3030/FoodOntologie/query", {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: sparqlQuery,
      });
      const data = await response.json();
      setSearchResults(data.results.bindings); // Mettre à jour les résultats de la recherche
    } catch (error) {
      console.error('Erreur lors de la recherche :', error);
    }
  };

  const handleOrderChange = (e) => {
    setSearchOrder(e.target.value); // Mettre à jour l'état avec la nouvelle valeur de l'ordre
  };

  return (
    <div className="food-search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Rechercher une nourriture..."
      />
      <select value={searchOrder} onChange={handleOrderChange}>
        <option value="ASC">Croissant</option>
        <option value="DESC">Décroissant</option>
      </select>
      <button onClick={handleSearch}>
        <FaSearch /> {/* Icône de recherche */}
      </button>
      <div className="search-results">
        {searchResults.map((result, index) => (
          <div key={index} className="food-result">
            <img src={result.image.value} alt={result.nom.value} />
            <div>{result.description.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodSearch;
