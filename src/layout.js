import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import injectContext from './store/appContext';
import Home from './views/home';
import Paises from './views/paises';
import PaisesEdit from './views/paises/edit';
import PaisesCreate from './views/paises/create';
import Login from './views/login';
import NotFound from './views/notfound';
import Auth from './auth/Auth';


const auth = new Auth();

const Layout = (props) => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" render={() => <Home auth={auth} />} />
            <Route exact path="/paises/:id/edit" render={() => <PaisesEdit auth={auth} />} />
            <Route exact path="/paises/create" render={() => <PaisesCreate auth={auth} />} />
            <Route exact path="/paises" render={() => <Paises auth={auth} />} />
            <Route exact path="/login" component={Login} />
            <Route render={() => <NotFound auth={auth} />} />
        </Switch>
    </BrowserRouter>
)
export default injectContext(Layout);