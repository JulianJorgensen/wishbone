import React from 'react';
import Slider from 'react-slick';
import {Link} from 'react-router';
import InstagramFeed from 'InstagramFeed';
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
    if (product){
      dispatch(actions.startAddorUpdateCartItem(product.selectedVariant, 1));
    }
  }

  render() {
    let {collections} = this.props;
    collections = collections.slice(0, 12);

    if (collections.length > 0) {
      return (
        <div>
          <div className="homepage-hero">
            <img src="/images/good-luck-good-cause.png" />
            <div className="subheader">Customize your lucky Wishbone Hat. 50% of profits go to charity you choose.</div>
            <Link to="/hats/" className="button hollow">View Hat Styles</Link>
            <Link href="#hats" className="arrow-down"><i className="fa fa-angle-down" aria-hidden="true"></i></Link>
          </div>
          <div id="hats"></div>
          <div className="container">
            <h3 className="hat-styles-header">HAT STYLES</h3>
            <h4 className="hat-styles-subheader">(Choose a style then select your colors)</h4>
            <div className="collections-grid">
              {collections.map(collection => {
                return <CollectionItem
                          key={collection.key}
                          addToCart={() => this.handleAddToCart(collection)}
                          id={collection.attrs.collection_id}
                          image={collection.attrs.image.src}
                          title={collection.attrs.title}
                          description={collection.attrs.body_html}
                        />
              })}
            </div>
          </div>
          <div className="homepage-hero-bottom">
          </div>

          <h3 className="section-header">News</h3>
          <div className="news">
            <div id="news-item-wishbone" className="news-item">
              <div className="news-item-inner"><Link to="/news/226615620"><div className="link-content">Wishbone Hats</div></Link></div>
            </div>
            <div id="news-item-charities" className="news-item">
              <div className="news-item-inner"><Link to="/news/226615620"><div className="link-content">About the Charities</div></Link></div>
            </div>
          </div>

          <InstagramFeed />
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
