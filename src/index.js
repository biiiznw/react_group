import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
//
ReactDOM.render(<App />, document.getElementById('root'));

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
// import thunk from 'redux-thunk';

// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
// import authReducer from './store/reducers/auth';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

// const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

// const rootReducer = combineReducers({
//     auth: authReducer,
// });

// const store = createStore(rootReducer, composeEnhancers(
//     applyMiddleware(thunk)
// ));

// const app = (
//     <Provider store={store}>
//         <BrowserRouter>
//             <App />
//         </BrowserRouter>
//     </Provider>
// );

// ReactDOM.render( app, document.getElementById( 'root' ) );
// registerServiceWorker();
