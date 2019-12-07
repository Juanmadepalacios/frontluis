import React from 'react';
import { Consumer } from './../../store/appContext';

const Login = (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <Consumer>
                        {
                            ({ store, actions }) => {
                                return (
                                    <>
                                        <h1>Login</h1>
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
                                        <form onSubmit={e => actions.handleLogin(e, props.history)}>
                                            <div className="form-group">
                                                <label htmlFor="username" className="form-label">Username:</label>
                                                <input className={"form-control " + (store.error.username ? "is-invalid" : "")}
                                                    type="text"
                                                    name="username"
                                                    value={store.username}
                                                    onChange={e => actions.handleChange(e)} />
                                                <div className="invalid-feedback">
                                                    {store.error.username}!
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password" className="form-label">Password:</label>
                                                <input className={"form-control " + (store.error.password ? "is-invalid" : "")}
                                                    type="password"
                                                    name="password"
                                                    value={store.password}
                                                    onChange={e => actions.handleChange(e)} />
                                                <div className="invalid-feedback">
                                                    {store.error.password}!
                                                </div>
                                            </div>
                                            <button className="btn btn-primary btn-block">Login</button>
                                        </form>

                                    </>
                                )
                            }
                        }
                    </Consumer>
                </div>
            </div>
        </div>
    );
};

export default Login;