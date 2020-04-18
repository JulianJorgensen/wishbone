import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import router from './router/router.jsx';
import shopifyAPI from 'api/shopifyAPI';
import fonts from './fonts/fonts.css';
import { startAddCollections } from 'actions/collectionActions';
import 'styles/app.scss';

let productActions = require('actions/productActions');
let store = require('store/configureStore').configure();

// subscribe to the redux store
store.subscribe(() => {
  let state = store.getState();
});

// add products and collections to store
store.dispatch(productActions.startAddProducts());
store.dispatch(startAddCollections());

// fetch content
console.log('fetch opage')
shopifyAPI.fetchPageContent();

// create shopify cart instance based on last session (based on localStorage)
shopifyAPI.createCart().then((localCart) => {
  store.dispatch({ type: 'SET_INITIAL_CART_STATE', localCart });
});

ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
);
