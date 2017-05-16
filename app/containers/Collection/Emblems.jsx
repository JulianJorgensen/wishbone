import React from 'react';
import {Link, IndexLink} from 'react-router';
import shopifyAPI from 'shopifyAPI';
let {connect} = require('react-redux');
let collectionActions = require('collectionActions');

class Emblems extends React.Component {
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
      <div className="emblem-colors">
        <h4 className="collection__subheadline">Choose <span className="font-black">WISHBONE</span> color: (3D puff embroidery)</h4>
        {activeProduct.options.map((option, index) => {
          if (option.name == "Emblem") {
            return (
              <div key={index} className="option-colors">
                {option.values.map((value, index) => {
                  return (
                    <div key={index} className={`option-color option-color__${value.replace(/\s+/g, '-').replace('-/-', '_').toLowerCase()}`} onClick={(event) => {
                      handleOptionChange(option.name, value);
                    }}></div>
                  )
                })}
              </div>
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
)(Emblems);
