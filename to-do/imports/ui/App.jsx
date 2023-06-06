import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TodoApp } from "./components/TodoApp.jsx";
// import { Login } from "./components/Login.jsx";
// import { Registro } from "./components/Registro.jsx";


export const App = () => (
    // <Router>
    //     <Switch>
    //         <Route exact path="/" component={Login} />
    //         <Route path="/registro" component={Registro} />
    //         <Route path="/to-do" component={TodoApp} />
    //     </Switch>
    // </Router>
    <div>
        <TodoApp />
    </div>
);
