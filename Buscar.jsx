// src/components/Buscador.jsx
import React from 'react';


// Cambiado de 'Buscar' a 'Buscador' para el nombre de la función del componente
function Buscador({ terminoBusqueda, onCambioBusqueda, textoMarcador  }) { // Cambiado de searchTerm, onSearchChange, placeholder
  return (
    <input
      type="text"
      className='buscar form-control mb-3' // Clases de Bootstrap para estilo
      placeholder={textoMarcador} // Usamos la prop traducida
      value={terminoBusqueda}     // Usamos la prop traducida
      onChange={onCambioBusqueda} // Usamos la prop traducida
    />
  );
}

export default Buscador; // Exportamos el componente con el nuevo nombre