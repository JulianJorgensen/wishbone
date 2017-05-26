import React from 'react';
import {Link, IndexLink} from 'react-router';
import shopifyAPI from 'shopifyAPI';
let {connect} = require('react-redux');
let collectionActions = require('collectionActions');

class Sizes extends React.Component {
  constructor(){
    super();
  }

  render() {
    let {dispatch, activeCollection} = this.props;

    let products = shopifyAPI.getCurrentCollection()[1];
    let activeProductIndex = activeCollection.activeProduct.index;
    let activeProduct = products[activeProductIndex];

    let handleOptionChange = (optionName, value) => {
    };

    activeProduct.options.map((option, optionsIndex) => {
      if (option.name == "Size") {
        return (
          <div className="product-sizes">
            <ul key={optionsIndex} className="product-sizes">
              {option.values.map((value, index) => {
                return (
                  <li
                    key={index}
                    className={`product-size ${option.selected === value ? 'selected' : ''}`}
                    onClick={() => {
                      this.handleOptionChange(option.name, value);
                  }}>
                    {value}
                  </li>);
              })}
            </ul>
          </div>
        )
      }
    });
    return <div></div>
  }
}

export default connect(
  (state) => {
    return {
      activeCollection: state.collections.active
    }
  }
)(Sizes);
