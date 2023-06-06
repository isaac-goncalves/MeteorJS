import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    // Lógica de login
  };

  return (
    <div className="container">
      <h2>Tela de Login</h2>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Senha</label>
        <input
          type="password"
          className="form-control"
          value={senha}
          onChange={e => setSenha(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleLogin}>
        Entrar
      </button>
    </div>
  );
};

export default Login;