import React from 'react';
import {Link, IndexLink} from 'react-router';

class Footer extends React.Component {
  constructor(){
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
              <p>A great About Us page helps builds trust between you and your customers. The more content you provide about you and your business, the more confident people will be when purchasing from your store.</p>
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
