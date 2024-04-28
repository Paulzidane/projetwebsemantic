import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate depuis react-router-dom
import './Header.css';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOrder, setSearchOrder] = useState('ASC');
  const navigate = useNavigate(); // Initialiser le hook useNavigate

  const handleSearch = () => {
    // Vérifier si le champ de recherche n'est pas vide
    if (searchTerm.trim() !== '') {
      // Rediriger vers le composant FoodSearch en passant searchTerm et searchOrder
      navigate('/foodsearch', { state: { searchTerm, searchOrder } });
    }else{
      navigate('/');
    }
  };

  const handleOrderChange = (e) => {
    setSearchOrder(e.target.value);
  };

  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <a href="/">Accueil</a>
          </li>
          <li>
            <a href="/signin">Se connecter</a>
          </li>
        </ul>
      </nav>
      <div className="search-container">
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
          <FaSearch />
        </button>
      </div>
    </header>
  );
};

export default Header;
