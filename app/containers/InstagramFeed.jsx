import React from 'react';

class InstagramFeed extends React.Component{
  constructor(){
    super();
  }

  render() {
    return (
      <div>
        <h3 className="section-header">Instagram</h3>
        <div className="instagram-feed">
          <div className="instagram-feed-item" style={{backgroundImage: "url('/images/instagramfeed/1.jpg')"}}></div>
          <div className="instagram-feed-item" style={{backgroundImage: "url('/images/instagramfeed/3.jpg')"}}></div>
          <div className="instagram-feed-item" style={{backgroundImage: "url('/images/instagramfeed/5.jpg')"}}></div>
          <div className="instagram-feed-item" style={{backgroundImage: "url('/images/instagramfeed/4.jpg')"}}></div>
          <div className="instagram-feed-item" style={{backgroundImage: "url('/images/instagramfeed/2.jpg')"}}></div>
          <div className="instagram-feed-item" style={{backgroundImage: "url('/images/instagramfeed/6.jpg')"}}></div>
          <div className="instagram-feed-item" style={{backgroundImage: "url('/images/instagramfeed/7.jpg')"}}></div>
          <div className="instagram-feed-item" style={{backgroundImage: "url('/images/instagramfeed/8.jpg')"}}></div>
          <div className="instagram-feed-item" style={{backgroundImage: "url('/images/instagramfeed/11.jpg')"}}></div>
          <div className="instagram-feed-item" style={{backgroundImage: "url('/images/instagramfeed/10.jpg')"}}></div>
          <div className="instagram-feed-item" style={{backgroundImage: "url('/images/instagramfeed/9.jpg')"}}></div>
          <div className="instagram-feed-item" style={{backgroundImage: "url('/images/instagramfeed/12.jpg')"}}></div>
        </div>
      </div>
    )
  }
}

module.exports = InstagramFeed;
