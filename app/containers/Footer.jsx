import React from 'react';
import { Link, IndexLink } from 'react-router';

class Footer extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <footer id="site-footer">
        <div className="footer-wishbone"><img src="/images/wishbone-footer.png" /></div>
        <nav className="footer-nav">
          <div className="row">
            <div className="footer-column">
              <div className="footer-nav-headline">WISHBONE</div>
              <ul>
                <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
                <li><Link to="/hats" activeClassName="active">Hats</Link></li>
                <li><Link to="/about" activeClassName="active">About</Link></li>
                <li><Link to="/contact" activeClassName="active">Contact</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <div className="footer-nav-headline">About Wishbone Hats</div>
              <p>Good Luck. Good Style. Good Cause.</p>
              <p>Everyone could use a little luck – so why not bring a little luck your way in style. Customize your lucky Wishbone hat in your favorite colors. $5 of every sale goes to the charity you choose.</p>
              <p>Every year Wishbone Hats will select 6 different charities to choose from. $5 will go to the charity selected on every purchase order.</p>
            </div>

            <div className="footer-column" id="footer-socialmedia">
              <div className="footer-nav-headline">Social Media</div>
              <a href="https://www.instagram.com/wishbonehats/" target="_new"><i className="fa fa-instagram" /></a>
              <a href="https://www.facebook.com/WishboneHats-247362542342002/" target="_new"><i className="fa fa-facebook-square" /></a>
              <a href="https://www.pinterest.com/wishbonehats/" target="_new"><i className="fa fa-pinterest" /></a>
            </div>
          </div>
        </nav>

        <div className="footer-copyright">&copy; WISHBONE HATS 2017</div>
        <ul className="footer-payment">
          <li><i className="fa fa-cc-amex"></i></li>
          <li><i className="fa fa-cc-jcb"></i></li>
          <li><i className="fa fa-cc-diners-club"></i></li>
          <li><i className="fa fa-cc-discover"></i></li>
          <li><i className="fa fa-cc-paypal"></i></li>
          <li><i className="fa fa-cc-mastercard"></i></li>
          <li><i className="fa fa-cc-visa"></i></li>
        </ul>
      </footer>
    )
  }
}

module.exports = Footer;
