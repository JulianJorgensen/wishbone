import React from 'react';
import {Link, IndexLink} from 'react-router';
import shopifyAPI from 'api/shopifyAPI';
let {connect} = require('react-redux');
let collectionActions = require('actions/collectionActions');

class Options extends React.Component {
  constructor(){
    super();
  }

  render() {
    let {dispatch, activeCollection} = this.props;

    let products = shopifyAPI.getCurrentCollection()[1];
    let activeProductIndex = activeCollection.activeProduct.index;
    let activeProduct = products[activeProductIndex];

    let handleOptionChange = (optionName, value) => {
      activeProduct.options.filter((option) => {
        return option.name === optionName;
      })[0].selected = value;

      let updatedActiveProduct = {
        index: activeProductIndex
      }
      this.props.handleOptionChange();
      dispatch(collectionActions.changeActiveProduct(updatedActiveProduct));
    };

    return (
      <div className="product-options">
        {activeProduct.options.map((option, index) => {
          console.log('active product: ', activeProduct);
          console.log('option name: ', option.name);
          if (option.name != "Title" && option.name != "Emblem") {
            console.log('selected o name: ', option.name);
            return (
              <select key={index} name={option.name} value={option.selected} onChange={(event) => {
                handleOptionChange(option.name, event.target.value);
              }}>
                {option.values.map((value, index) => {
                  return (
                    <option key={index} value={value}>{value}</option>
                  )
                })}
              </select>
            )
          }
        })}
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
)(Options);
