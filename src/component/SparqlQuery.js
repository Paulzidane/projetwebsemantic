import React, { useState } from 'react';
import { FaPlay } from 'react-icons/fa'; // 
import './SparqlQuery.css'; // Importer le fichier CSS pour le style

const SparqlQuery = () => {
  const [query, setQuery] = useState(''); // État local pour stocker la requête SPARQL
  const [results, setResults] = useState(null); // État local pour stocker les résultats de la requête

  const handleQueryChange = (event) => {
    setQuery(event.target.value); // Mettre à jour l'état avec la valeur de la requête
  };

  const executeQuery = async () => {
    var data = new URLSearchParams();
    data.set("query", query); // Utilisez la valeur de la requête saisie

    const response = await fetch("http://localhost:3030/FoodOntologie/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: data,
    });

    const result = await response.json();
    setResults(result.results.bindings); // Mettez à jour l'état avec les données récupérées
  };

  return (
    <div className="sparql-query-container"> {/* Utiliser une classe pour le conteneur */}
      <h2>Exécution de requête SPARQL</h2>
      <div className='querycomponent'>
      <div className='queryspace'>
        <label htmlFor="sparqlQuery">Entrez votre requête SPARQL :</label>
        <br />
        <textarea id="sparqlQuery" value={query} onChange={handleQueryChange} />
      </div>
     <div className='button'>
     <button onClick={executeQuery}>
          <FaPlay /> {/* Utiliser l'icône "play" de React Icons */}
        </button>
     </div>
      </div>
      {results && (
        <div className="query-results"> {/* Utiliser une classe pour les résultats */}
          <h3>Résultats de la requête</h3>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SparqlQuery;
