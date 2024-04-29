import React, { useState } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOrder, setSearchOrder] = useState('ASC');
  const navigate = useNavigate();

  const handleSearch = () => {
    // Vérifier si le champ de recherche n'est pas vide
    if (searchTerm.trim() !== '') {
      // Rediriger vers le composant FoodSearch en passant searchTerm et searchOrder
      navigate('/foodsearch', { state: { searchTerm, searchOrder } });
    } else {
      navigate('/');
    }
  };

  const handleOrderChange = (e) => {
    setSearchOrder(e.target.value);
  };

  const handleAddFood = () => {
    // Rediriger vers le composant pour ajouter une nouvelle nourriture
    navigate('/addfood');
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
      <button onClick={handleAddFood} style={{ backgroundColor: 'white', marginRight: '10px',
      padding: '5px 5px',borderRadius:'10px', color: 'blue', cursor: 'pointer',width:'150px',height:'35px' }}>
              <FaPlus /> Add Food
      </button>
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
