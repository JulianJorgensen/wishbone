import shopifyAPI from 'shopifyAPI';

export var setActiveCollection = (collection) => {
  return {
    type: 'SET_ACTIVE_COLLECTION',
    collection
  };
};

// Add collections to store
export var startAddCollections = () => {
  return (dispatch) => {
    return shopifyAPI.buyClient.fetchAllCollections().then((data) => {
      var collections = data || {};
      var parsedCollections = [];

      Object.keys(collections).forEach((collectionId) => {
        parsedCollections.push({
          key: collectionId,
          ...collections[collectionId]
        });
      });

      dispatch(addCollections(parsedCollections));
    });
  };
};

export var addCollections = (collections) => {
  return {
    type: 'ADD_COLLECTIONS',
    collections
  };
};

export var changeActiveProduct = (updatedActiveProduct) => {
  return {
    type: 'CHANGE_ACTIVE_PRODUCT',
    updatedActiveProduct
  };
};

export var setCharity = (charity) => {
  return {
    type: 'SET_CHARITY',
    charity
  };
};

export var clearActiveCollection = () => {
  return {
    type: 'CLEAR_ACTIVE_COLLECTION'
  };
};
