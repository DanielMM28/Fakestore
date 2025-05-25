
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Buscador from './Buscar';



function Consumo({ agregarAlCarrito }) { 
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((data) => data.json())
      .then((productosData) => setProductos(productosData))
  }, []);

  const vermas = (id) => {
    const producto = productos.find((p) => p.id === id);
    setProductoSeleccionado(producto);
  };

  const cerrarModal = () => setProductoSeleccionado(null);

  const manejarCambioBusqueda = (event) => {
    setTerminoBusqueda(event.target.value);
  };

  const productosFiltrados = productos.filter((producto) => {
    if (terminoBusqueda === '') {
      return true;
    }
    return producto.id.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
           producto.title.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
           producto.category.toLowerCase().includes(terminoBusqueda.toLowerCase());
  });

  return (
    <div className="container py-4" style={{ maxWidth: '1200px' }}>
      <h2 className="text-center mb-4" style={{ fontSize: '70px' }}>Tienda Virtual</h2>
      <Buscador
        terminoBusqueda={terminoBusqueda}
        onCambioBusqueda={manejarCambioBusqueda}
        textoMarcador="Buscar por ID..."
      />
      <hr />
      <div className="row">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={producto.id}>
              <div className="card h-100 text-center shadow-sm" style={{
                borderRadius: '10px', background: 'linear-gradient(to right,rgb(51, 50, 50),rgb(54, 54, 54),rgb(56, 55, 55))', color: 'white'
              }}>
                <p className='id'> {producto.id}</p>
                <img src={producto.image} alt={producto.title} className="card-img-top p-3" style={{ height: '200px', objectFit: 'contain' }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title" style={{ fontSize: '14px' }}>{producto.title}</h5>
                  <p className="card-text">Precio: ${producto.price}</p>
                  <button
                    className="btn btn-secondary mt-auto"
                    onClick={() => vermas(producto.id)} >
                    Ver más
                  </button>
                  <button
                    
                    onClick={() => agregarAlCarrito(producto)} // <-- Se usa la prop recibida
                    className="btn btn-secondary mt-2">
                     <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
              <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
            </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No se encontraron productos con ese ID.</p>
          </div>
        )}
      </div>

      {productoSeleccionado && (
        <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content" style={{
              borderRadius: '10px', background: 'linear-gradient(to right,rgb(0, 0, 0),rgb(0, 0, 0),rgb(0, 0, 0))', color: 'white', width: '500px', justifyContent: 'center', alignItems: 'center',
              display: 'flex', flexDirection: 'column', padding: '50px', marginLeft: '160px',
            }}>
              <button type="button" className="btn-close" onClick={cerrarModal} style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: 'white' }}></button>
              <div className="modal-header" style={{ borderBottom: 'none' }}>
                <h5 className="modal-title">{productoSeleccionado.title}</h5>
              </div>
              <div className="modal-body text-center">
                <img src={productoSeleccionado.image} alt={productoSeleccionado.title} className="img-fluid mb-3" style={{ maxHeight: '300px', objectFit: 'contain' }} />
                <p><strong>ID:</strong> {productoSeleccionado.id}</p>
                <p><strong>Precio:</strong> ${productoSeleccionado.price}</p>
                <p><strong>Descripción:</strong> {productoSeleccionado.description}</p>
                <p><strong>Categoría:</strong> {productoSeleccionado.category}</p>
                <p><strong>Calificación:</strong> {productoSeleccionado.rating.rate} ({productoSeleccionado.rating.count} votos)</p>
              </div>
               <button
                    
                    onClick={() => agregarAlCarrito(productoSeleccionado)} // <-- Se usa la prop recibida
                    className="btn btn-secondary mt-2">
                     <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
              <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
            </svg>
                  </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Consumo;