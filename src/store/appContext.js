import React, {Component} from 'react';
import getState from './flux';

export const {Consumer, Provider} = React.createContext(null);

const injectContext = PassedComponent => {
    class StoreWrapper extends Component {
        constructor(props){
            super(props);
            this.state = getState({
                getStore: () => this.state.store,
                getActions: () => this.state.actions,
                setStore: updatedStore => 
                    this.setState({
                        store: Object.assign(this.state.store, updatedStore)
                    })
            });
        }

        componentDidMount(){
            if(this.state.actions.isAuthenticated()){
                this.state.actions.restoreSession();
            }
            this.state.actions.getPaises();
        }

        render(){
            return (
                <Provider value={this.state}>
                    <PassedComponent {...this.props} />
                </Provider>
            )
        }

    }
    return StoreWrapper;
}

export default injectContext;

