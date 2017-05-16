import React from 'react';
import {Link} from 'react-router';

class CollectionItem extends React.Component {
  render() {
    let {title, id, image} = this.props;
    console.log('img: ', image);

    return (
      <div className="collection-item">
        <div className="collection-item-inner">
          <Link to={`/hat/${id}`}><div className="collection-item-image" style={{backgroundImage: 'url(' + image + ')'}}></div></Link>
          <hr />
          <h6 className="collection-item-title"><Link to={`/hat/${id}`}>{title}</Link></h6>
          <div className="author">
            <div className="author__photo" style={{backgroundImage: 'url(' + image + ')'}}></div>
            <div className="author__info">
              <Link to ={`/author/`}>
                <div className="author__name">James88</div>
                <div className="author__location">Canton Ohio</div>
              </Link>
            </div>
          </div>
          {/* <button onClick={this.props.addToCart} className="btn">Add To Cart</button> */}
        </div>
      </div>
    )
  }
}

module.exports = CollectionItem;
