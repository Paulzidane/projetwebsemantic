import React from 'react';
import FoodList from './component/FoodList'; // Importer le composant FoodList
import SparqlQuery from './component/SparqlQuery'; // Importer le composant SparqlQuery
import FoodSearch from './component/FoodSearch';

function App() {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/signin">Sign In</a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
      <FoodSearch /> {/* Afficher le composant de recherche de nourriture */}
        <FoodList /> {/* Afficher le composant FoodList sur la page d'accueil */}
        <SparqlQuery /> {/* Afficher le composant SparqlQuery */}
      </main>
    </div>
  );
}

export default App;
