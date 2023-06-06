import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css"; // Importação do Bootstrap CSS

import styles from "./TodoApp.module.css";

export const Registro = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleRegistro = () => {
        // Call the server method to perform the registration
        Meteor.call("users.register", nome, email, senha, (error, result) => {
            if (error) {
                console.log("Error:", error);
            } else {
                console.log("Registration result:", result);
                // Handle the registration result here
            }
        });
    };

    return (
        <div className={styles.container}>
            <h2>Tela de Registro</h2>
            <div className="form-group">
                <label>Nome</label>
                <input
                    type="text"
                    className="form-control"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Senha</label>
                <input
                    type="password"
                    className="form-control"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
            </div>
            <button className="btn btn-primary" onClick={handleRegistro}>
                Registrar
            </button>
        </div>
    );
};
