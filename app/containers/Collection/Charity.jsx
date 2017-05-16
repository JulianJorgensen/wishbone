import React from 'react';
import {Link, IndexLink} from 'react-router';
import shopifyAPI from 'shopifyAPI';
let {connect} = require('react-redux');
let collectionActions = require('collectionActions');

class Charity extends React.Component {
  constructor(){
    super();

    this.state = {
      modalIsOpen: false,
      charities: null
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  componentWillMount(){
    shopifyAPI.getCharities().then((charities) => {
      this.setState({
        charities: charities
      });
      console.log('Setting charities to state: ', charities);
    });
  }

  render() {
    let {dispatch, activeCollection, activeCharity} = this.props;
    let charities = this.state.charities;

    if (charities){
      return (
        <div className="charities-wrapper">
          <h4 className="collection__subheadline">Select a charity <small className="font-orange">- 50% of profits go to the charity you choose.</small></h4>
          <div className="charities">
            {charities.map((charity) => {
              return (
                <div className={`charity ${activeCharity ? activeCharity.id === charity.id ? 'active' : '' : ''}`} onClick={() => {
                  dispatch(collectionActions.setCharity(charity));
                }}>{charity.title}</div>
              )
            })}
          </div>
        </div>
      )
    }else{
      return (<div></div>)
    }
  }
}

export default connect(
  (state) => {
    return {
      activeCollection: state.collections.active,
      activeCharity: state.collections.charity
    }
  }
)(Charity);
