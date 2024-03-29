let express = require('express');
let router = express.Router();
let Shopify = require('shopify-api-node');


// Environment and variables
const NODE_ENV = (process.env.NODE_ENV || 'development');
let ENV_CONFIG = require('.././config/' + NODE_ENV + '.config');
require('dotenv').config();

// Establish connection with Shopify
const shopify = new Shopify({
  shopName: 'wishbone-hats',
  apiKey: process.env.SHOPIFY_API_KEY,
  password: process.env.SHOPIFY_API_KEY_PASSWORD
});


// Get news post item
router.route('/get-news-item')
  .get(function (req, res) {
    shopify.article.get(req.query.blog_id, req.query.post_id)
    .then((newsItem) => {
      res.status(200).send(newsItem);
    })
    .catch(err => console.error(err));
  });

// Get page content
router.route('/get-pages')
  .get(function (req, res) {
    shopify.page.list()
    .then(data => {
        console.log('data', data)
      res.status(200).send(data);
    })
    .catch(err => console.error(err));
  });


module.exports = router;


// var config = {
//   rate_limit_delay: 10000,
//   backoff: 35,
//   backoff_delay: 1000
// };
//
// var url = shopify.buildAuthURL();

// app.get('/finish_auth', function(req, res) {
//   var Shopify = new shopifyAPI(config), // You need to pass in your config here
//     query_params = req.query;
//   Shopify.exchange_temporary_token(query_params, function(err, data) {});
// });
//
// function callback(err, data, headers) {
//   var api_limit = headers['http_x_shopify_shop_api_call_limit'];
//   console.log(api_limit); // "1/40"
// }
//
// shopifyAPI.prototype.exchange_temporary_token = function(query_params, callback) {
//   if (!self.is_valid_signature(query_params)) {
//     return callback(new Error("Signature is not authentic!"));
//   }
// }
//
// app.post('/new_product', function(req, res) {
//   data = {
//     product: {
//       title: req.body.title,
//       body_html: req.body.body_html,
//       images: [
//         {
//           src: req.body.image_src
//         }
//       ],
//       vendor: "Vendor",
//       product_type: "Type"
//     }
//   }
//
//   shopify.post('/admin/products.json', data, function(err, resp, headers) {
//     if (err)
//       return next(error);
//     return res.json(resp);
//   });
// });
//
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }
//
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });
