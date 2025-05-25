// src/components/Carrito.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'
// REMOVE: import { useCarrito } from '../context/ContextoCarrito'; // <--- ELIMINAR ESTA LÍNEA

// Recibe las props directamente
function Carrito({ itemsCarrito, quitarDelCarrito, actualizarCantidad,limpiarCarrito }) { // <--- CAMBIO AQUÍ

  const manejarCompra = () => {
   Swal.fire({
      icon: 'success',
      title: '¡Compra Realizada!'
    });
    limpiarCarrito(); // Limpiar el carrito después de la compra
   
  };

  if (itemsCarrito.length === 0) {
    return (
      <div className="container mt-4 text-center">
        <p>Tu carrito está vacío.</p>
      </div>
    );
  }
 
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Tu Carrito de Compras</h2>
      <ul className="list-group">
        {itemsCarrito.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-1">{item.title}</h5>
              <p className="mb-1">Precio: ${item.price}</p>
              <p className="mb-1">Subtotal: ${item.price * item.cantidad}</p>
             
              <div className="d-flex align-items-center">
                
                <span>Cantidad: {item.cantidad}</span>
               
              </div>
            </div>
            <div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => quitarDelCarrito(item.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
      
      <div className="d-grid gap-2 mt-4">
        <button className="btn btn-success btn-lg" onClick={manejarCompra} >Comprar </button>
      </div>
    </div>
  );
}

export default Carrito;