
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'; 
function Login({ onExitoLogin }) {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    if (!nombreUsuario || !contrasena) {
      setError('Por favor, ingresa tu nombre de usuario y contraseña.');
      setCargando(false);
      return;
    }

    try {
      const respuesta = await fetch('https://fakestoreapi.com/users');
      const usuarios = await respuesta.json();
      const usuarioEncontrado = usuarios.find(
        (usuario) => usuario.username === nombreUsuario && usuario.password === contrasena
      );

      if (usuarioEncontrado) {
        const tokenSimulado = `token-simulado-para-${usuarioEncontrado.id}-${Date.now()}`;
        if (onExitoLogin) {
          onExitoLogin(tokenSimulado);
        }
      } else {
        setError('Usuario o contraseña incorrectos.');
      }
    } catch (err) {
        console.error('Error durante el inicio de sesión:', err);
        setError('Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo.');
    } 
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: 'black' }}>
      <div className="card shadow-lg p-4" style={{ height: '350px', width: '300px', borderRadius: '30px', backgroundColor: 'rgb(90, 90, 90)', color: 'white' }}>
        <h3 className="card-title text-center mb-4">Iniciar Sesión </h3>
        <form onSubmit={manejarEnvio}>
          <div className="mb-3">
            <label htmlFor="usernameInput" className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              id="usernameInput"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              disabled={cargando}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="passwordInput" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              disabled={cargando}
            />
          </div>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary" disabled={cargando}>
              {cargando ? 'Cargando...' : 'Iniciar Sesión'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;