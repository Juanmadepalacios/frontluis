const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            username: '',
            password: '',
            access_token: '',
            refresh_token: '',
            current_user: {},
            urlAPI: 'http://localhost:5000',
            errors: null,
            error: {},
            paises: [],
            pais:{}
        },
        actions: {
            handleChange: e => {
                const { name, value } = e.target;
                setStore({
                    [name]: value
                })
            },
            handleChangePais: e => {
                const store = getStore();
                const {pais} = store;
                const {name, value} = e.target;
                pais[name] = value;
                setStore({
                     // pais:pais
                    pais
                })
            },
            handleLogin: (e, history) => {
                e.preventDefault(); // Evito que se envie el formulario
                const store = getStore(); // Obtengo el store completo
                const { username, password } = store; // Extraer del store el username y el password 
                let data = { username, password }; // Crear un objeto data que contiene como atributo username y password con sus respectivos valores
                //console.log(data); // Muestro el contenido de el nuevo objeto data

                fetch(store.urlAPI + '/login', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data);
                        if (data.username || data.password || data.msg) {
                            setStore({
                                error: data
                            });
                        } else {
                            getActions().setSessionStorage(data);
                            setStore({
                                access_token: data.access_token,
                                refresh_token: data.refresh_token,
                                current_user: data.user,
                                expires_at: data.expires_at,
                                username: '',
                                password: '',
                                errors: null,
                                error: {},
                                paises:[]
                            });

                            history.push('/');
                        }

                    })
                    .catch(errors => setStore({ errors }))
            },
            setSessionStorage: data => {
                const fecha = (data.expires_at * 1000) + new Date().getTime();

                sessionStorage.setItem('access_token', data.access_token);
                sessionStorage.setItem('refresh_token', data.refresh_token);
                sessionStorage.setItem('expires_at', fecha);
                sessionStorage.setItem('current_user', JSON.stringify(data.user));
            },
            restoreSession: () => {
                const a = sessionStorage.getItem("access_token");
                const b = sessionStorage.getItem("refresh_token");
                const c = JSON.parse(sessionStorage.getItem("expires_at"));
                const d = JSON.parse(sessionStorage.getItem("current_user"));

                setStore({
                    access_token: a, refresh_token: b, expires_at: c, current_user: d
                })
            },
            isAuthenticated(){
                const expiresAt = JSON.parse(sessionStorage.getItem("expires_at"));
                return new Date().getTime() < expiresAt;
            },
            logout: history => {
                sessionStorage.removeItem('access_token');
                sessionStorage.removeItem('refresh_token');
                sessionStorage.removeItem('expires_at');
                sessionStorage.removeItem('current_user');
                setStore({
                    current_user: {}
                });
                history.push('/login');
            },
            getPaises: () => {
                const store = getStore();
                fetch(store.urlAPI + '/paises', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.access_token
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data);
                        if (data.msg) {
                            setStore({
                                error: data
                            });
                        } else {
                            setStore({
                                paises: data,
                                error: {}
                            });

                        }

                    })
                    .catch(errors => setStore({ errors }))
            },
            editPais: (e,pais)  => {
                setStore({
                    pais
                })
            },
            handleEditPais: (e, history) => {
                e.preventDefault();
                const store = getStore();
                const {pais} = store;
                fetch(store.urlAPI + '/paises/' + pais.id, {
                    method: 'PUT',
                    body: JSON.stringify(pais),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.access_token
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        //console.log(data);
                        if (data.pais) {
                            setStore({
                                error: data
                            });
                        } else {
                            setStore({
                                pais: {},
                                errors: null,
                                error: {},
                            });
                            history.push('/paises');
                        }
                    })
                    .catch(errors => setStore({ errors }))
              },
            handleCreatePais:(e, history) => {
                e.preventDefault();
                const store = getStore();
                const {pais} = store;
                fetch(store.urlAPI + '/paises', {
                    method: 'POST',
                    body: JSON.stringify(pais),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.access_token
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        //console.log(data);
                        if (data.pais) {
                            setStore({
                                error: data
                            });
                        } else {
                            setStore({
                               pais: {},
                               errors: null,
                               error: {},
                            });
                            getActions().getPaises();

                            history.push('/paises');
                        }

                    })
                    .catch(errors => setStore({ errors }))
            },
            handleDeletePais:(e, history, pais) => {
                e.preventDefault();
                const store = getStore();
                fetch(store.urlAPI + '/paises/' + pais.id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + store.access_token
                    }
                })
                    .then(resp => resp.json())
                    .then(data => {
                        //console.log(data);
                        if (data.pais) {
                            setStore({
                                error: data
                            });
                        } else {
                            
                            getActions().getPaises();

                            history.push('/paises');
                        }

                    })
                    .catch(errors => setStore({ errors }))
            },
            

            }
        }
    }


export default getState;