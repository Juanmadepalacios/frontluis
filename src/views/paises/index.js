import React, { Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Consumer } from './../../store/appContext';
import NavBar from './../../components/navbar';

const Paises = (props) => {
    return (
        <Fragment>
            <NavBar auth={props.auth} />
            <div className="container">
                <div className="row">
                    <div className="col-md-10 offset-md-1">
                        <Consumer>
                            {
                                ({ store, actions }) => {
                                    return (
                                        <>
                                            <br/>
                                            {
                                                store.error.msg && (
                                                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                                        <strong>Holy guacamole!</strong> {store.error.msg}.
                                                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                )
                                            }
                                            <br/>
                                            <table className="table table-striped table-dark">
                                            <thead>
                                                <tr>
                                                <th width="5%">#</th>
                                                <th width="85%">Pais</th> 
                                                <th width="2%">Acciones</th>  
                                                </tr>
                                            </thead>
                                            <tbody>
                                           
                                                {
                                                    store.paises.length > 0 && store.paises.map((pais) => {
                                                        return (
                                                            <tr key={pais.id}>
                                                                <td>{pais.id}</td>
                                                                <td>{pais.name}</td>
                                                            <td><Link to={"/paises/" + pais.id + "/edit"} className="btn btn-info btn-sm" onClick={(e) => actions.editPais(e, pais)}>
                                                                    <i className="fa fa-edit"></i> 
                                                                </Link>
                                                            </td>
                                                                <td><button onClick={(e) => actions.handleDeletePais(e, props.history, pais)}className="btn btn-danger btn-sm">
                                                                <i className="fa fa-trash"></i> 
                                                                </button>
                                                            </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                

                                            </tbody>
                                            </table>
                                            <Link to="paises/create" className="btn btn-success btn-sm">Crear Pais</Link>
                                        </>
                                    )
                                }
                            }
                        </Consumer>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default withRouter(Paises);