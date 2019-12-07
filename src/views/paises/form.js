import React from 'react';
import {Consumer} from './../../store/appContext';

const PaisForm = (props) => (
    <Consumer>
        {
            ({store, actions}) => (
    <form onSubmit={e => props.handlePais(e, props.history)}>
        <div className="form-group">
            <label htmlFor="name" className="form-label">Name:</label>
             <input className={"form-control " + (store.error.name ? "is-invalid" : "")}
                type="text"
                name="name"
                value={store.pais.name}
                onChange={e => actions.handleChangePais(e)} />
            <div className="invalid-feedback">
                    {store.error.name}!
            </div>
        </div>
        <button className="btn btn-primary btn-block">{props.actionFormTitle}</button>
    </form>
            )
        }
    </Consumer>
    
)


export default PaisForm;