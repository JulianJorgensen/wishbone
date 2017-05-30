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
import ReactTooltip from 'react-tooltip';

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
      imageStatus: 'loading',
      productSelected: false,
      emblemSelected: false,
      charitySelected: false,
      showError: false
    }

    let dispatch;
    let products = [];

    this.handleProductChange = this.handleProductChange.bind(this);
    this.handleEmblemChange = this.handleEmblemChange.bind(this);
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleCharityChange = this.handleCharityChange.bind(this);
  }

  componentWillMount(){
    this.dispatch = this.props.dispatch;
    let collectionId = this.props.params.collectionId;
    let activeProductIndex;

    if (this.props.activeCollection){
      activeProductIndex = this.props.activeCollection.activeProduct.index;
      this.setState({productSelected: true});
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
    this.dispatch(collectionActions.productIsSelected(false));
    this.dispatch(collectionActions.clearActiveCollection());
  }

  handleProductChange() {
    this.setState({
      imageStatus: 'loading',
      productSelected: true
    });
  }

  handleEmblemChange() {
    this.setState({
      imageStatus: 'loading',
      emblemSelected: true
    });
  }

  handleOptionChange() {
    this.setState({
      optionSelected: true
    });
  }

  handleCharityChange() {
    this.setState({
      charitySelected: true
    });
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

      console.log('>> activeProduct: ', activeProduct);

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

                  <Products error={this.state.showError && !this.state.productSelected} handleOptionChange={this.handleProductChange} showHeadline={true} />

                  <Emblems error={this.state.showError && !this.state.emblemSelected} handleOptionChange={this.handleEmblemChange} />

                  <Options handleOptionChange={this.handleOptionChange} />

                  <Sizes />

                  <Charity error={this.state.showError && !this.state.charitySelected} handleOptionChange={this.handleCharityChange} />

                  <div className="product-price">{utils.formatAsMoney(selectedVariant.price)}</div>

                  <button
                    onClick={()=>{
                      if (this.state.productSelected && this.state.emblemSelected && this.state.charitySelected){
                        dispatch(cartActions.startAddorUpdateCartItem(activeProduct.selectedVariant, 1));
                      }else{
                        this.setState({
                          showError: true
                        });
                      }
                    }}
                    className="button large add-to-cart">Add To Cart</button>
                    <div className={`error-msg ${this.state.showError && (!this.state.productSelected || !this.state.emblemSelected || !this.state.charitySelected) ? 'active' : ''}`}>Please make selections above to continue.</div>
                  <img src="/images/credit-cards.png" alt="Accepted credit cards" />
                </div>
              </div>
            </div>
          </div>
          <InstagramFeed />
          <ReactTooltip />
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
