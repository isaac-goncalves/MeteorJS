import React from 'react';
import { TodoApp } from './components/TodoApp.jsx';
import { Info } from './Info.jsx';
import { Login } from './components/Login.jsx';
import { Registro } from './components/Registro.jsx';

export const App = () => (
  <div>
   
<Router>
<Switch>
  <Route exact path="/" component={Login} />
  <Route path="/registro" component={Registro} />
  <Route path="/to-do" component={ TodoApp} />
</Switch>
</Router>
  </div>

);
