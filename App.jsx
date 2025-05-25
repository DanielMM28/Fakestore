// src/App.js
import React, { useState } from 'react';
import Consumo from './components/Card';
import Login from './components/login'; // Corregida la importación a 'login' (minúscula)
import Carrito from './components/Carrito';
import Swal from 'sweetalert2'


function App() {
  const [estaAutenticado, setEstaAutenticado] = useState(false);
  const [tokenAutenticacion, setTokenAutenticacion] = useState(null);

  // --- Lógica del Carrito (Ahora en App.js) ---
  const [itemsCarrito, setItemsCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setItemsCarrito((itemsAnteriores) => {
      const itemExistente = itemsAnteriores.find((item) => item.id === producto.id);

      if (itemExistente) {
        return itemsAnteriores.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      } else {
        return [...itemsAnteriores, { ...producto, cantidad: 1 }];
      }
    });
    Swal.fire({
      title: 'Producto Agregado',
     text: `El producto ${producto.title} (ID: ${producto.id}) ha sido agregado al carrito.`,
      icon: 'success',
      confirmButtonText: 'Aceptar'
      
    });
  };

  const quitarDelCarrito = (productoId) => {
    setItemsCarrito((itemsAnteriores) => itemsAnteriores.filter((item) => item.id !== productoId));
  };

  const actualizarCantidad = (productoId, nuevaCantidad) => {
    setItemsCarrito((itemsAnteriores) =>
      itemsAnteriores
        .map((item) =>
          item.id === productoId ? { ...item, cantidad: Math.max(1, nuevaCantidad) } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const limpiarCarrito = () => {
    setItemsCarrito([]);
    Swal.fire({
      title: 'Carrito Limpiado',
      text: 'Has limpiado el carrito de compras.',
      icon: 'info',
      confirmButtonText: 'Aceptar'
    });
  };
  


  const manejarExitoLogin = (token) => {
    setEstaAutenticado(true); 
    setTokenAutenticacion(token); 
    Swal.fire({
      title: 'Inicio de sesión exitoso',
      text: 'Bienvenido a la tienda virtual.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  };

  const manejarCerrarSesion = () => { setEstaAutenticado(false);setTokenAutenticacion(null);limpiarCarrito(); 
    Swal.fire({
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión correctamente.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
  })
  };
 

  return (
    <div>
      {estaAutenticado ? (
        <ContenidoAutenticado onCerrarSesion={manejarCerrarSesion}itemsCarrito={itemsCarrito}agregarAlCarrito={agregarAlCarrito}quitarDelCarrito={quitarDelCarrito} actualizarCantidad={actualizarCantidad} />
      ) : (
        <Login onExitoLogin={manejarExitoLogin} />
      )}
    </div>
  );
}

// Componente para el contenido autenticado
function ContenidoAutenticado({onCerrarSesion,itemsCarrito,agregarAlCarrito,quitarDelCarrito,actualizarCantidad}) {
  const [mostrarModalCarrito, setMostrarModalCarrito] = useState(false);
   const alternarModalCarrito = () => {
    setMostrarModalCarrito(!mostrarModalCarrito);
  };
  

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ backgroundColor: 'black' }}>
        <div className="container-fluid" style={{ backgroundColor: 'black' }}>
          <div className="d-flex align-items-center">
            <button className="btn btn-outline-danger me-3" onClick={onCerrarSesion}>
              Cerrar Sesión
            </button>
            <button className="btn btn-outline-info" onClick={alternarModalCarrito}>
              {mostrarModalCarrito ? 'Ocultar Carrito' : 'Ver Carrito'}
            </button>
          </div>
        </div>
      </nav>
      <Consumo agregarAlCarrito={agregarAlCarrito} />

      {mostrarModalCarrito && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}tabIndex="-1"aria-labelledby="carritoModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="carritoModalLabel">Tu Carrito de Compras</h5>
                <button type="button"className="btn-close" aria-label="Cerrar" onClick={alternarModalCarrito}></button>
              </div>
              <div className="modal-body">
                <Carrito itemsCarrito={itemsCarrito}  quitarDelCarrito={quitarDelCarrito}actualizarCantidad={actualizarCantidad} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={alternarModalCarrito}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;