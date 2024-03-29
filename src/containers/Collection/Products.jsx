import React from 'react';
import {Link, IndexLink, browserHistory} from 'react-router';
import shopifyAPI from 'api/shopifyAPI';
import utils from 'utils/utils';
let {connect} = require('react-redux');
let collectionActions = require('actions/collectionActions');

class Products extends React.Component {
  constructor(){
    super();

    let state = {
      selected: false
    }
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

      this.setState({
        selected: true
      });

      if (this.props.handleOptionChange){
        this.props.handleOptionChange();
      }

      dispatch(collectionActions.changeActiveProduct(updatedActiveProduct));
      dispatch(collectionActions.productIsSelected(true));

      if (collectionId){
        browserHistory.push(`/hat/${collectionId}`);
      }
    };

    return (
      <div className="products">
        <h4 className={`collection__subheadline ${this.props.error ? 'error' : ''} ${showHeadline ? '' : 'hide'}`}>Choose <span className="font-black">HAT</span> color:</h4>

        <div className="option-colors">
          {products.map((product, index) => {
            let title = product.title.split(' - ').slice(-1)[0];
            return (
              <div data-tip={title} key={index} className={`option-color option-color__${title.replace(/\s+/g, '-').replace('-/-', '_').toLowerCase()} ${(activeProductIndex == index) && collections.productIsSelected ? 'active' : ''}`} onClick={(event) => {
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
