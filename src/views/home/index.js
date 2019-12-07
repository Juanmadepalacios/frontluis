import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Consumer } from './../../store/appContext';
import NavBar from './../../components/navbar';

const Home = (props) => {
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
                                            <h1>Home</h1>
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

export default withRouter(Home);