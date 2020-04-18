import React from 'react';
import Instafeed from 'react-instafeed';

export default class InstagramFeed extends React.Component {
  render() {
    return (
      <div>
        <h3 className="section-header">Instagram</h3>
        <div className="instagram-feed" id='instafeed'>
          {/* <Instafeed
            limit='12'
            target='instafeed'
            resolution='standard_resolution'
            sortBy='most-recent'
            template={`<div class="instagram-feed-item" style="background-image: url({{image}});"><a class="insta-link" href={{link}} target="_new"></a></div>`}
            userId='4609619593'
            clientId='52ffc56115e543cf8e31af1cb89af8a5'
            accessToken='4609619593.52ffc56.3bd94d759d2a4fbf913c1fc68a52c300'
          /> */}
        </div>
      </div>
    )
  }
}
