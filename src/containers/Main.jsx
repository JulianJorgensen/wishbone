import React from 'react';
import DocumentMeta from 'react-document-meta';
import Header from 'containers/Header';
import Footer from 'containers/Footer';
import Cart from 'containers/Cart';

export default class Main extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      title: '',
      content: ''
    };
  }

  render() {
    const meta = {
      title: 'Wishbone Hats',
      description: 'Wishbone Hats',
      meta: {
        charset: 'utf-8'
      },
      auto: {
        ograph: true
      }
    };

    let pageName = this.props.location.pathname.substr(1).split('/');

    return (
      <div id="main" className={`page-${pageName[0] ? pageName[0] + ' subpage' : 'home'}`}>
        <DocumentMeta {...meta} />
        <Header />
        <div id="main-container">
          <Cart />
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}
