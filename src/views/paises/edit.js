import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Consumer } from './../../store/appContext';
import NavBar from './../../components/navbar';
import PaisForm from './form';

const PaisesEdit = (props) => {
    //const {id} = props.match.params;
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
                                                store.error.pais && (
                                                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                                        <strong>Holy guacamole!</strong> {store.error.pais}.
                                                        <button type="button" className="close" data-dismiss="alert"                   aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                )
                                            }
                                            <br/>
                                            <h1>Editar Pais</h1>
                                            <PaisForm actionFormTitle="Editar" 
                                            handlePais={actions.handleEditPais}
                                            history={props.history}
                                            />
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

export default withRouter(PaisesEdit);