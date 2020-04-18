import React from 'react';
import DocumentMeta from 'react-document-meta';

class About extends React.Component{
  constructor(){
    super();
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1>ABOUT WISHBONE HATS</h1>
          <p>A great About Us page helps builds trust between you and your customers. The more content you provide about you and your business, the more confident people will be when purchasing from your store.</p>
          <p>Your About Us page might include:</p>
          <ul>
            <li>Who you are</li>
            <li>Why you sell the items you sell</li>
            <li>Where you are located</li>
            <li>How long you have been in business</li>
            <li>How long you have been running your online shop</li>
            <li>Who are the people on your team</li>
            <li>Contact information</li>
            <li>Social links (Twitter, Facebook)</li>
            <li>To edit the content on this page, go to the Pages section of your Shopify admin.</li>
          </ul>
        </div>
      </section>
    )
  }
}

module.exports = About;
