import React from 'react';
let {connect} = require('react-redux');
import shopifyAPI from 'shopifyAPI';
import Loader from 'Loader';
import axios from 'axios';

class PageItem extends React.Component {
  constructor() {
    super();

    this.state = {
      data: null
    }
  }

  setPageContent(props){
    console.log('setting page content: ', shopifyAPI.getPage(props.location.pathname.slice(1)));
    this.setState({
      data: shopifyAPI.getPage(props.location.pathname.slice(1))
    });
  }

  componentWillReceiveProps(newProps){
    this.setPageContent(newProps);
  }

  componentWillMount(){
    this.setPageContent(this.props);
  }

  render() {
    let {data} = this.state;

    if (data){
      function createMarkup(){
         return {__html: data.body_html};
      }

      return (
        <div className="container">
          <h1>{data.title}</h1>
          <div className="body" dangerouslySetInnerHTML={createMarkup()}></div>
        </div>
      )
    }else{
      return (
        <Loader />
      )
    }
  }
}


module.exports = PageItem;
