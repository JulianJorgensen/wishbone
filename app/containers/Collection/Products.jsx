import React from 'react';
import {Link, IndexLink, browserHistory} from 'react-router';
import shopifyAPI from 'shopifyAPI';
import utils from 'utils';
let {connect} = require('react-redux');
let collectionActions = require('collectionActions');

class Products extends React.Component {
  constructor(){
    super();
  }

  render() {
    let {dispatch, collectionId, collections, activeCollection, showHeadline} = this.props;

    let products;
    let activeProductIndex;
    let activeProduct;

    if (collectionId){
      let collection = utils.searchObjects(collectionId, 'key', collections.all);
      products = collection.products;
    }else{
      products = shopifyAPI.getCurrentCollection()[1];
      activeProductIndex = activeCollection.activeProduct.index;
      activeProduct = products[activeProductIndex];
    }

    let handleProductChange = (index) => {
      let updatedActiveProduct = {
        index: index
      }

      if (this.props.handleOptionChange){
        this.props.handleOptionChange();
      }

      dispatch(collectionActions.changeActiveProduct(updatedActiveProduct));

      if (collectionId){
        browserHistory.push(`/hat/${collectionId}`);
      }
    };

    return (
      <div className="products">
        <h4 className={`collection__subheadline ${showHeadline ? '' : 'hide'}`}>Choose <span className="font-black">HAT</span> color:</h4>

        <div className="option-colors">
          {products.map((product, index) => {
            let title = product.title.split(' - ').slice(-1)[0];
            return (
              <div key={index} className={`option-color option-color__${title.replace(/\s+/g, '-').replace('-/-', '_').toLowerCase()} ${activeProductIndex == index ? 'active' : ''}`} onClick={(event) => {
                handleProductChange(index);
              }}></div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      collections: state.collections,
      activeCollection: state.collections.active
    }
  }
)(Products);
