import React, { useState, useEffect } from 'react';
import './AddFood.css';
import { useNavigate } from 'react-router-dom';

const AddFood = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
 
  useEffect(() => {
    // Ouvrir le modal dès que le composant est monté
    setShowModal(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construire la requête SPARQL pour ajouter la nouvelle nourriture
    const sparqlQuery = new URLSearchParams();
    sparqlQuery.set("update", `
      PREFIX food: <http://www.semanticweb.org/kemthopaul/ontologies/2024/3/foodData#>
      INSERT DATA {
        _:newFood a food:Dish ;
          food:name "${name}" ;
          food:description "${description}" ;
          food:image "${imageUrl}" .
      }
    `);

    try {
      const response = await fetch("http://localhost:3030/FoodOntologie/update", {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: sparqlQuery,
      });

      if (response.ok) {
        setShowConfirmation(true);
        setTimeout(() => {
          setShowModal(false);
          setShowConfirmation(false);
          setName('');
          setDescription('');
          setImageUrl('');
        }, 2000);
      } else {
        console.error('Erreur lors de l\'ajout de la nourriture :', response.status);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la nourriture :', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/');
  };

  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Dish</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nom :</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <fieldset>
                <legend>Description :</legend>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  placeholder='Entrez la description de la nourriture'
                ></textarea>
              </fieldset>
              <div className="form-group">
                <label htmlFor="imageUrl">URL de l'image :</label>
                <input
                  type="text"
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                  placeholder='https://github.com/jiofidelus/tsotsa/blob/main/TSOTSAImg_dataset/Zambia/Bunnychow.jpeg'
                />
              </div>
              <button type="submit" className="submit-btn">
                Enregistrer
              </button>
            </form>
            {showConfirmation && (
              <div className="confirmation-message">
                La nouvelle nourriture a été ajoutée avec succès !
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AddFood;
