import React from 'react';
import Slider from 'react-slick';
import {Link} from 'react-router';
let {connect} = require('react-redux');
let actions = require('cartActions');

import Loader from 'Loader';
import CollectionItem from 'CollectionItem';

class Index extends React.Component {
  constructor() {
    super();
  }

  handleAddToCart(product) {
    let {dispatch} = this.props;
    dispatch(actions.startAddorUpdateCartItem(product.selectedVariant, 1));
  }

  render() {
    let {collections} = this.props;
    collections = collections.slice(0, 12);

    if (collections.length > 0) {
      return (
        <div>
          <div className="homepage-hero"></div>
          <div className="container">
            <div className="collections-grid">
              {collections.map(collection => {
                return <CollectionItem
                          key={collection.key}
                          addToCart={() => this.handleAddToCart(collection)}
                          id={collection.attrs.collection_id}
                          image={collection.attrs.image.src}
                          title={collection.attrs.title} />
              })}
            </div>
          </div>
        </div>
      )
    }else{
      return (
        <Loader />
      )
    }
  }
}

export default connect(
  (state) => {
    return {
      collections: state.collections.all
    }
  }
)(Index);
