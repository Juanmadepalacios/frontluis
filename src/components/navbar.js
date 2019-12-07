import React, {useEffect} from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Consumer } from './../store/appContext';

const NavBar = (props) => {
    useEffect(() => {
        if (!props.auth.isAuthenticated()) {
            props.history.push('/login');
        }
    });
    return (
        <Consumer>
            {
                ({ store, actions }) => {
                    return (
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <a className="navbar-brand" href="/#">Navbar</a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Administracion
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <h6 className="dropdown-header">--- Configuracion ---</h6>
                                            <Link className="dropdown-item" to="/paises">Paises</Link>
                                            <Link className="dropdown-item" to="/#">Categorias</Link>
                                            <div className="dropdown-divider"></div>
                                            <h6 className="dropdown-header">--- Seguridad ---</h6>
                                            <Link className="dropdown-item" to="/#">Roles</Link>
                                            <Link className="dropdown-item" to="/#">Usarios</Link>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="/#">Something else here</a>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link disabled" href="/#" tabIndex="-1" aria-disabled="true">Disabled</a>
                                    </li>
                                </ul>
                                <form className="form-inline my-2 my-lg-0">
                                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                                </form>
                                <ul className="navbar-nav my-2 my-lg-0">
                                <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="/#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {store.current_user.nombre}
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <a className="dropdown-item" href="/#">Action</a>
                                            <a className="dropdown-item" href="/#">Another action</a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="/#" onClick={
                                                e => {
                                                    e.preventDefault();
                                                    actions.logout(props.history);
                                                }
                                            }>Salir</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    )
                }
            }
        </Consumer>
    );
}

export default withRouter(NavBar);