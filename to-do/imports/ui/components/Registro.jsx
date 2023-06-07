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
                alert("Erro ao registrar");
                //clear fields
                setNome("");
                setEmail("");
                setSenha("");
            } else {
                console.log("Registration result:", result);
                alert("Registrado com sucesso!");
                //  clear inputs 
                setNome("");
                setEmail("");
                setSenha("");
            }
        });
    };

    return (
        <div className={styles.container}>
            <h2>Tela de Registro</h2>
            <div className={styles.inputWrapper}> 
                <label>Nome:</label>
                <input
                    type="text"
                    className={styles.input}
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
            </div>
            <div className={styles.inputWrapper}> 
                <label>Email:</label>
                <input
                    type="email"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className={styles.inputWrapper}> 
                <label>Senha:</label>
                <input
                    type="password"
                    className={styles.input}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
            </div>
            <button className={styles.insertButton} onClick={handleRegistro}>
                Registrar
            </button>
        </div>
    );
};
