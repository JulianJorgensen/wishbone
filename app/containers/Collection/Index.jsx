import React from 'react';
import {Link} from 'react-router';
let {connect} = require('react-redux');
let productActions = require('productActions');
let collectionActions = require('collectionActions');
let cartActions = require('cartActions');
import {browserHistory} from 'react-router';
import utils from 'utils';
import shopifyAPI from 'shopifyAPI';
import Loader from 'Loader';
import InstagramFeed from 'InstagramFeed';

import Products from 'Collection/Products';
import Options from 'Collection/Options';
import Emblems from 'Collection/Emblems';
import Sizes from 'Collection/Sizes';
import Charity from 'Collection/Charity';

class Collection extends React.Component {
  constructor(){
    super();

    this.state = {
      dataFetched: false,
      imageStatus: 'loading'
    }

    let dispatch;
    let products = [];

    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  componentWillMount(){
    this.dispatch = this.props.dispatch;
    let collectionId = this.props.params.collectionId;
    let activeProductIndex;

    if (this.props.activeCollection){
      activeProductIndex = this.props.activeCollection.activeProduct.index;
    }else{
      activeProductIndex = 0;
    }

    shopifyAPI.activateCollection(collectionId, activeProductIndex).then((data) => {
      let collection = data[0];
      this.dispatch(collectionActions.setActiveCollection(collection));
      this.setState({
        dataFetched: true
      });
    });
  }

  componentWillUnmount(){
    this.dispatch(collectionActions.clearActiveCollection());
  }

  handleOptionChange() {
    this.setState({ imageStatus: 'loading' });
  }

  handleImageLoaded() {
    this.setState({ imageStatus: 'loaded' });
  }

  handleImageErrored() {
    this.setState({ imageStatus: 'failed to load' });
  }

  render() {
    let {dispatch, activeCollection} = this.props;

    if (this.state.dataFetched) {
      let products = shopifyAPI.getCurrentCollection()[1];
      let activeProductIndex = activeCollection.activeProduct.index;
      let activeProduct = products[activeProductIndex];

      let {collection_id, body_html, title, image} = activeCollection;
      let {selectedVariant, selectedVariantImage} = activeProduct;

      let renderDescription = () => {
        if (body_html){
          return (
            <div className="description">
              <h5 className="collection__subheadline">Description</h5>
              <div dangerouslySetInnerHTML={{__html: body_html}}></div>
            </div>
          )
        }
      }

      return (
        <div>
          <div className="container">
            <div className="row">
              <div className="small-12 medium-7 column">
                <div className="active-product-image">
                  <img
                    src={selectedVariantImage.variants[7].src}
                    onLoad={this.handleImageLoaded.bind(this)}
                    onError={this.handleImageErrored.bind(this)}
                    />
                  {this.state.imageStatus === 'loading' ? <Loader /> : '' }
                </div>
              </div>
              <div className="small-12 medium-5 column">
                <h1 className="collection-title">{title}</h1>
                <div className="collection-info">
                  {renderDescription()}

                  <Products handleOptionChange={this.handleOptionChange} showHeadline={true} />

                  <Emblems handleOptionChange={this.handleOptionChange} />

                  <Options handleOptionChange={this.handleOptionChange} />

                  <Sizes />

                  <Charity />

                  <div className="product-price">{utils.formatAsMoney(selectedVariant.price)}</div>

                  <button
                    onClick={()=>{
                      dispatch(cartActions.startAddorUpdateCartItem(activeProduct.selectedVariant, 1));
                    }}
                    className="button large add-to-cart">Add To Cart</button>
                  <img src="/images/credit-cards.png" alt="Accepted credit cards" />
                </div>
              </div>
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
      activeCollection: state.collections.active
    }
  }
)(Collection);
