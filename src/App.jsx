import React, { useState, useEffect } from 'react';
import './App.css';

// Componente principal de la aplicación
function App() {
  const [personajes, setPersonajes] = useState([]); // Almacena la lista de personajes
  const [busqueda, setBusqueda] = useState('');      // Controla el texto ingresado por el usuario
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState(null); // Personaje para mostrar en el modal

  // Función para buscar personajes desde la API
  const buscarPersonajes = async () => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${busqueda}`);
    const data = await response.json();
    setPersonajes(data.results || []); // Si no hay resultados, se pone un array vacío
  };

  // Maneja el clic del botón Buscar
  const handleBuscar = () => {
    buscarPersonajes();
  };

  // Maneja la apertura del modal con los detalles del personaje
  const verMas = (personaje) => {
    setPersonajeSeleccionado(personaje);
  };

  // Cierra el modal
  const cerrarModal = () => {
    setPersonajeSeleccionado(null);
  };

  return (
    <div className="container">
      {/* Título principal de la aplicación */}
      <h1>Rick and Morty App</h1>
  
      {/* Barra de búsqueda: campo de texto */}
      <input
        type="text"
        placeholder="Buscar personaje..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)} // Actualiza el estado con lo que escribe el usuario
      />
  
      {/* Botón para ejecutar la búsqueda */}
      <button onClick={handleBuscar}>Buscar</button>
  
      {/* Contenedor que muestra la lista de personajes */}
      <div className="lista-personajes">
        {/* Se recorre cada personaje obtenido de la API */}
        {personajes.map((p) => (
          <div className="personaje" key={p.id}>
            {/* Imagen del personaje */}
            <img src={p.image} alt={p.name} />
  
            {/* Nombre del personaje */}
            <div className="nombre">{p.name}</div>
  
            {/* Especie del personaje */}
            <div className="especie">{p.species}</div>
  
            {/* Botón para ver más detalles (abre el modal) */}
            <button onClick={() => verMas(p)}>Ver más</button>
          </div>
        ))}
      </div>
  
      {/* Modal que aparece cuando se selecciona un personaje */}
      {personajeSeleccionado && (
        <div className="modal-overlay" onClick={cerrarModal}>
          {/* Contenido del modal */}
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            {/* Botón para cerrar el modal */}
            <button className="modal-cerrar" onClick={cerrarModal}>×</button>
  
            {/* Imagen y detalles del personaje seleccionado */}
            <img src={personajeSeleccionado.image} alt={personajeSeleccionado.name} />
            <h2>{personajeSeleccionado.name}</h2>
            <p><strong>Especie:</strong> {personajeSeleccionado.species}</p>
            <p><strong>Estado:</strong> {personajeSeleccionado.status}</p>
            <p><strong>Género:</strong> {personajeSeleccionado.gender}</p>
            <p><strong>Origen:</strong> {personajeSeleccionado.origin.name}</p>
          </div>
        </div>
      )}
    </div>
  );
  
}

export default App;
