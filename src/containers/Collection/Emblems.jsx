import React from 'react';
import {Link, IndexLink} from 'react-router';
import shopifyAPI from 'api/shopifyAPI';
let {connect} = require('react-redux');
let collectionActions = require('actions/collectionActions');

class Emblems extends React.Component {
  constructor(){
    super();

    this.state = {
      active: null
    }
  }

  render() {
    let {dispatch, activeCollection} = this.props;

    let products = shopifyAPI.getCurrentCollection()[1];
    let activeProductIndex = activeCollection.activeProduct.index;
    let activeProduct = products[activeProductIndex];

    let handleOptionChange = (optionName, value) => {
      this.props.handleOptionChange(optionName, value);
      this.setState({
        active: value
      });
    };

    return (
      <div className="emblem-colors">
        <h4 className={`collection__subheadline ${this.props.error ? 'error' : ''}`}>Choose <span className="font-black">WISHBONE</span> color: (3D puff embroidery)</h4>
        {activeProduct.options.map((option, index) => {
          if (option.name == "Emblem") {
            return (
              <div key={index} className="option-colors">
                {option.values.map((value, index) => {
                  return (
                    <div key={index} data-tip={value} className={`option-color option-color__${value.replace(/\s+/g, '-').replace('-/-', '_').toLowerCase()} ${value == this.state.active ? 'active' : ''}`} onClick={(event) => {
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
