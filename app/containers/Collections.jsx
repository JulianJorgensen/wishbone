import React from 'react';
let {connect} = require('react-redux');
let actions = require('cartActions');
import Loader from 'Loader';
import CollectionItem from 'CollectionItem';

class Collections extends React.Component {
  constructor() {
    super();
  }

  handleAddToCart(product) {
    let {dispatch} = this.props;
    dispatch(actions.startAddorUpdateCartItem(product.selectedVariant, 1));
  }

  render() {
    let {collections} = this.props;

    if (collections.length > 0) {
      return (
        <div className="container">
          <div className="row">
            <div className="small-12 column">
              <div className="collections-grid">
                {collections.map(collection => {
                  return <CollectionItem
                            key={collection.key}
                            addToCart={() => this.handleAddToCart(product)}
                            id={collection.attrs.collection_id}
                            image={collection.attrs.image.src}
                            title={collection.attrs.title} />
                })}
              </div>
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
)(Collections);
