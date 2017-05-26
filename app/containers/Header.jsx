import React from 'react';
import {Link, IndexLink} from 'react-router';
let {connect} = require('react-redux');
let cartActions = require('cartActions');

class Header extends React.Component {
  constructor(){
    super();
  }

  render() {
    let {dispatch, cartItems} = this.props;

    return (
      <div id="site-header-wrapper">
        <div className="container">
          <header id="site-header">
            <div id="site-logo">
              <IndexLink to="/" activeClassName="active"><img src="/images/logo.png" /></IndexLink>
            </div>

            <nav id="site-nav">
              <li className="site-nav-item"><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
              <li className="site-nav-item"><Link to="/hats" activeClassName="active">Hats</Link></li>
              <li className="site-nav-item"><Link to="/about" activeClassName="active">About</Link></li>
              <li className="site-nav-item"><Link to="/contact" activeClassName="active">Contact</Link></li>
              <li className="site-nav-item"><Link onClick={()=>{
                dispatch(cartActions.openCart());
              }}>Cart</Link></li>
            </nav>
          </header>
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      cartItems: state.cart.lineItemsCount
    }
  }
)(Header);
