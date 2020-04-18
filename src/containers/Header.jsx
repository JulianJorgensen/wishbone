import React from 'react';
import {Link, IndexLink} from 'react-router';
let {connect} = require('react-redux');
let cartActions = require('actions/cartActions');

class Header extends React.Component {
  constructor(){
    super();

    this.state = {
      navActive: false
    }

    this.handleNavToggle = this.handleNavToggle.bind(this);
    this.closeNav = this.closeNav.bind(this);
  }

  handleNavToggle(){
    this.setState({
      navActive: !this.state.navActive
    });
  }

  closeNav(){
    this.setState({
      navActive: false
    });
  }

  render() {
    let {dispatch, cartItems} = this.props;

    let navItems = () => {
      return (
        <div>
          <li className="site-nav-item"><IndexLink onClick={this.closeNav} to="/" activeClassName="active">Home</IndexLink></li>
          <li className="site-nav-item"><Link onClick={this.closeNav} to="/hats" activeClassName="active">Hats</Link></li>
          <li className="site-nav-item"><Link onClick={this.closeNav} to="/about" activeClassName="active">About</Link></li>
          <li className="site-nav-item"><Link onClick={this.closeNav} to="/contact" activeClassName="active">Contact</Link></li>
          <li className="site-nav-item"><Link onClick={()=>{
            this.closeNav();
            dispatch(cartActions.openCart());
          }}>Cart</Link></li>
        </div>
      )
    }

    return (
      <div id="site-header-wrapper">
        <div className="container">
          <header id="site-header">
            <div id="site-logo">
              <IndexLink to="/" activeClassName="active"><img src="/images/logo.png" /></IndexLink>
            </div>

            <nav id="site-nav" className="show-for-large">
              {navItems()}
            </nav>

            <div className="mobile-nav-icon"><i onClick={this.handleNavToggle} className={`fa ${this.state.navActive ? 'fa-times' : 'fa-bars'}`} /></div>
            <nav id="mobile-nav" className="hide-for-large">
              {this.state.navActive ? navItems() : ''}
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
