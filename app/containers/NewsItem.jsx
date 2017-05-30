import React from 'react';
let {connect} = require('react-redux');
let actions = require('cartActions');
import Loader from 'Loader';
import axios from 'axios';

class NewsItem extends React.Component {
  constructor() {
    super();

    this.state = {
      data: null
    }
  }

  componentWillMount(){
    axios.get('/shopify/get-news-item', {
      params: {
        blog_id: '91669572',
        post_id: this.props.params.postId
      }
    })
    .then((response) => {
      console.log('got news data from api', response.data);
      this.setState({
        data: response.data
      });
    })
    .catch(error => console.log('Error: ', error));
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
          <div className="body" dangerouslySetInnerHTML={createMarkup()}>
          </div>
        </div>
      )
    }else{
      return (
        <Loader />
      )
    }
  }
}


module.exports = NewsItem;
