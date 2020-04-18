import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import utils from 'utils/utils';
import shopifyAPI from 'api/shopifyAPI';
import Loader from 'presentational/Loader';
import InstagramFeed from 'containers/InstagramFeed';
import ReactTooltip from 'react-tooltip';
import Collapsible from 'react-collapsible';

import Products from 'containers/Collection/Products';
import Options from 'containers/Collection/Options';
import Emblems from 'containers/Collection/Emblems';
import Sizes from 'containers/Collection/Sizes';
import Charity from 'containers/Collection/Charity';
let { connect } = require('react-redux');
let productActions = require('actions/productActions');
let collectionActions = require('actions/collectionActions');
let cartActions = require('actions/cartActions');

class Collection extends React.Component {
  constructor() {
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

  componentWillMount() {
    this.dispatch = this.props.dispatch;
    let collectionId = this.props.params.collectionId;
    let activeProductIndex;

    if (this.props.activeCollection) {
      activeProductIndex = this.props.activeCollection.activeProduct.index;
      this.setState({ productSelected: true });
    } else {
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

  componentWillUnmount() {
    this.dispatch(collectionActions.productIsSelected(false));
    this.dispatch(collectionActions.clearActiveCollection());
  }

  handleProductChange() {
    this.setState({
      imageStatus: 'loading',
      productSelected: true
    });

    // keep the emblem as the selected when selecting new product
    if (this.state.emblemSelected) {
      this.handleEmblemChange('Emblem', this.state.emblemSelected);
    }
  }

  handleOptionChange() {
    this.setState({
      optionSelected: true
    });

    // keep the emblem as the selected when selecting new product
    if (this.state.emblemSelected) {
      this.handleEmblemChange('Emblem', this.state.emblemSelected);
    }
  }

  handleEmblemChange(optionName, value) {
    let products = shopifyAPI.getCurrentCollection()[1];
    let activeProductIndex = this.props.activeCollection.activeProduct.index;
    let activeProduct = products[activeProductIndex];

    this.setState({
      imageStatus: 'loading',
      emblemSelected: value
    });

    // persist the emblem change
    shopifyAPI.changeProduct(value);

    // update active product index
    let updatedActiveProduct = {
      index: activeProductIndex
    }
    this.dispatch(collectionActions.changeActiveProduct(updatedActiveProduct));
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
    let { dispatch, activeCollection } = this.props;

    if (this.state.dataFetched) {
      let products = shopifyAPI.getCurrentCollection()[1];
      let activeProductIndex = activeCollection.activeProduct.index;
      let activeProduct = products[activeProductIndex];

      let { collection_id, body_html, title, image } = activeCollection;
      let { selectedVariant, selectedVariantImage } = activeProduct;

      let renderDescription = () => {
        if (body_html) {
          return (
            <div className="description">
              <h5 className="collection__subheadline show-for-medium">Description</h5>
              <div dangerouslySetInnerHTML={{__html: body_html}}></div>
            </div>
          )
        }
      }

      return (
        <div>
          <div className="container">
            <h1 className="collection-title hide-for-medium">{title}</h1>
            <div className="hide-for-medium">
              <div className="accordion">
                <Collapsible trigger="Description" transitionTime={200}>
                  {renderDescription()}
                </Collapsible>
              </div>
            </div>
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
                <h1 className="collection-title show-for-medium">{title}</h1>
                <div className="collection-info">
                  <div className="show-for-medium">{renderDescription()}</div>

                  <Products error={this.state.showError && !this.state.productSelected} handleOptionChange={this.handleProductChange} showHeadline={true} />

                  <Emblems error={this.state.showError && !this.state.emblemSelected} handleOptionChange={this.handleEmblemChange} />

                  <Options handleOptionChange={this.handleOptionChange} />

                  <Sizes />

                  <Charity error={this.state.showError && !this.state.charitySelected} handleOptionChange={this.handleCharityChange} />

                  <div className="product-price">{utils.formatAsMoney(selectedVariant.price)}</div>

                  <div className="add-to-cart-wrapper">
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
                    </div>
                    <div className={`error-msg ${this.state.showError && (!this.state.productSelected || !this.state.emblemSelected || !this.state.charitySelected) ? 'active' : ''}`}>Please make selections above to continue.</div>
                    <ul className="payment-method-icons">
                      <li><i className="fa fa-cc-visa"></i></li>
                      <li><i className="fa fa-cc-mastercard"></i></li>
                      <li><i className="fa fa-cc-discover"></i></li>
                      <li><i className="fa fa-cc-amex"></i></li>
                      <li><i className="fa fa-cc-paypal"></i></li>
                    </ul>
                </div>
              </div>
            </div>
          </div>
          <InstagramFeed />
          <ReactTooltip multiline={true} className="tooltip" />
        </div>
      )
    } else {
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
