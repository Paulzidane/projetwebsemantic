import React, { useState, useEffect } from 'react';

const FoodList = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    async function fetchData() {
      var data = new URLSearchParams();
      data.set("query",`
      PREFIX foo: <http://filmontology.org/ontology/1.0/>
      PREFIX fo: <http://www.w3.org/1999/XSL/Format#>
      PREFIX owl: <http://www.w3.org/2002/07/owl#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      PREFIX food: 	<http://www.semanticweb.org/kemthopaul/ontologies/2024/3/foodData#>

      SELECT ?nom ?description ?image
      WHERE {
        ?individu rdf:type food:Dish.
        ?individu food:name ?nom .
        ?individu food:description ?description.
        ?individu food:image ?image.
      }`);

      const response = await fetch("http://localhost:3030/FoodOntologie/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: data,
      });

      const result = await response.json();
      console.log(result); // Vérifiez la structure de la réponse dans la console
      setFoods(result.results.bindings); // Mettez à jour l'état avec les données récupérées
    }

    fetchData();
  }, []);



  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <h2>Liste des nourritures</h2>
      {foods.map((food, index) => (
        <div key={index} style={{ width: '300px', margin: '10px', textAlign: 'center' }}>
          <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto' }}>
            <img src={food.image.value + "?raw=true"} alt={food.nom.value} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <h3>{food.nom.value}</h3>
          <p>{food.description.value}</p>
        </div>
      ))}
    </div>
  );
};

export default FoodList;