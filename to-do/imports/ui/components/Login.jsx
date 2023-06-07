import React, { useState } from "react";

import styles from "./TodoApp.module.css";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleLogin = () => {
        // Call the server method to perform the login
        Meteor.call("users.login", email, senha, (error, result) => {
            if (error) {
                console.log("Error:", error);
                alert("Senha Invalida ou incorreta");
                //clear fields 
                setEmail("");
                setSenha("");
            } else {
                console.log("Login result:", result);
                // Handle the login result here

                // Store the user ID in localStorage
                localStorage.setItem("userId", result);

                // Normally in a real application, a token would be returned from the server
                // which you could also store in localStorage. For the purpose of this example,
                // we'll just create a fake token.
                const fakeToken = "1234567890abcdef";
                localStorage.setItem("token", fakeToken);
                window.location.href = "/";
            }
        });
    };
    return (
        <div className={styles.container}>
            <h2>Tela de Login</h2>
            <div>
                <label>Email</label>
                <input
                    className={styles.input}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Senha</label>
                <input
                    className={styles.input}
                    type="password"
                   
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
            </div>
            <button className={styles.insertButton} onClick={handleLogin}>
                Entrar
            </button>
        </div>
    );
};
