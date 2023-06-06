import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'; // Importação do Bootstrap CSS

const Registro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleRegistro = () => {
    // Lógica de registro
  };

  return (
    <div className="container">
      <h2>Tela de Registro</h2>
      <div className="form-group">
        <label>Nome</label>
        <input
          type="text"
          className="form-control"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
      </div>
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
      <button className="btn btn-primary" onClick={handleRegistro}>
        Registrar
      </button>
    </div>
  );
};

export default Registro;