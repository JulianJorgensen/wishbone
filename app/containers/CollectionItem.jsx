import React from 'react';
let {connect} = require('react-redux');
import {Link} from 'react-router';
import Products from 'Collection/Products';
import utils from 'utils';

class CollectionItem extends React.Component {
  constructor() {
    super();
  }

  render() {
    let {title, id, image, description, collections} = this.props;

    let getProductPrice = () => {
      let matchedCollection = utils.searchObjects(id, 'key', collections);
      if (matchedCollection.products.length > 0){
        return utils.formatAsMoney(matchedCollection.products[0].selectedVariant.price);
      }
    }

    return (
      <div className="collection-item">
        <div className="collection-item-inner">
          <Link to={`/hat/${id}`}><div className="collection-item-image" style={{backgroundImage: 'url(' + image + ')'}}></div></Link>
        </div>
        <h3 className="collection-item-title">{title}</h3>
        <Products collectionId={id} />
        <div className="price">{getProductPrice()}</div>
      </div>
    )
  }
}
export default connect(
  (state) => {
    return {
      collections: state.collections.all
    }
  }
)(CollectionItem);
