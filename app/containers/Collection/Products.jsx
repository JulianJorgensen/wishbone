import React from 'react';
import {Link, IndexLink} from 'react-router';
import shopifyAPI from 'shopifyAPI';
let {connect} = require('react-redux');
let collectionActions = require('collectionActions');

class Products extends React.Component {
  constructor(){
    super();
  }

  render() {
    let {dispatch, activeCollection} = this.props;

    let products = shopifyAPI.getCurrentCollection()[1];
    let activeProductIndex = activeCollection.activeProduct.index;
    let activeProduct = products[activeProductIndex];

    let handleProductChange = (index) => {
      let updatedActiveProduct = {
        index: index
      }
      this.props.handleOptionChange();
      dispatch(collectionActions.changeActiveProduct(updatedActiveProduct));
    };

    return (
      <div className="products">
        <h4 className="collection__subheadline">Choose <span className="font-black">HAT</span> color:</h4>

        <div className="option-colors">
          {products.map((product, index) => {
            let title = product.title.split(' - ').slice(-1)[0];
            return (
              <div key={index} className={`option-color option-color__${title.replace(/\s+/g, '-').replace('-/-', '_').toLowerCase()}`} onClick={(event) => {
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
      activeCollection: state.collections.active
    }
  }
)(Products);
