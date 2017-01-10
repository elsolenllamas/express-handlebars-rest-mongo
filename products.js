var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), 
    bodyParser = require('body-parser'), 
    methodOverride = require('method-override'); 

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method
        delete req.body._method
        return method
      }
}))

router.route('/')
.get(function(req, res, next) {
    mongoose.model('Product').find({}, function (err, products) {
          if (err) {
              return console.error(err);
          } else {
              res.format({
                html: function(){
                    res.render('products/index', {
                          title: 'All Products',
                          "products" : products
                      });
                },
                json: function(){
                    res.json(products);
                }
            });
          }     
    });
})
.post(function(req, res) {
    var name = req.body.name;
    var category = req.body.category;
    var size = req.body.size;
    var color = req.body.color;
    mongoose.model('Product').create({
        name : name,
        category : category,
        size : size,
        color : color
    }, function (err, product) {
          if (err) {
              res.send("There was a problem adding the information to the database.");
          } else {
              res.format({
                html: function(){
                    res.location("products");
                    res.redirect("/products");
                },
                json: function(){
                    res.json(product);
                }
            });
          }
    })
});

//CATEGORIES FILTER
router.route('/men')
.get(function(req, res, next) {
    mongoose.model('Product').find({category: 'men'}, function (err, products) {
          if (err) {
              return console.error(err);
          } else {
              res.format({
                html: function(){
                    res.render('products/index', {
                          title: 'All Men Products',
                          "products" : products
                      });
                },
                json: function(){
                    res.json(products);
                }
            });
          }     
    });
});

router.route('/woman')
.get(function(req, res, next) {
    mongoose.model('Product').find({category: 'woman'}, function (err, products) {
          if (err) {
              return console.error(err);
          } else {
              res.format({
                html: function(){
                    res.render('products/index', {
                          title: 'All Woman Products',
                          "products" : products
                      });
                },
                json: function(){
                    res.json(products);
                }
            });
          }     
    });
});

router.route('/kids')
.get(function(req, res, next) {
    mongoose.model('Product').find({category: 'kids'}, function (err, products) {
          if (err) {
              return console.error(err);
          } else {
              res.format({
                html: function(){
                    res.render('products/index', {
                          title: 'All Kids Products',
                          "products" : products
                      });
                },
                json: function(){
                    res.json(products);
                }
            });
          }     
    });
});

router.get('/new', function(req, res) {
    res.render('products/new', { title: 'Add New Product' });
});



router.param('id', function(req, res, next, id) {
    mongoose.model('Product').findById(id, function (err, product) {
        if (err) {
            console.log(id + ' was not found');
            res.status(404)
            var err = new Error('Not Found');
            err.status = 404;
            res.format({
                html: function(){
                    next(err);
                 },
                json: function(){
                       res.json({message : err.status  + ' ' + err});
                 }
            });
        } else {
            req.id = id;
            next(); 
        } 
    });
});

router.route('/:id')
  .get(function(req, res) {
    mongoose.model('Product').findById(req.id, function (err, product) {
      if (err) {
        console.log('There was an error on: ' + err);
      } else {
        res.format({
          html: function(){
              res.render('products/show', {
                "product" : product
              });
          },
          json: function(){
              res.json(product);
          }
        });
      }
    });
  });

router.route('/:id/edit')
	.get(function(req, res) {
	    mongoose.model('Product').findById(req.id, function (err, product) {
	        if (err) {
	            console.log('There was an error on: ' + err);
	        } else {
	            res.format({
	                html: function(){
	                       res.render('products/edit', {
	                          title: 'Product' + product._id,
	                          "product" : product
	                      });
	                 },
	                json: function(){
	                       res.json(product);
	                 }
	            });
	        }
	    });
	})

	.put(function(req, res) {
	    var name = req.body.name;
      var category = req.body.category;
	    var size = req.body.size;
	    var color = req.body.color;

	    mongoose.model('Product').findById(req.id, function (err, product) {
	        product.update({
	            name : name,
              category : category,
	            size : size,
	            color : color
	        }, function (err, productID) {
	          if (err) {
	              res.send("There was a problem updating the information to the database: " + err);
	          } 
	          else {
	                  res.format({
	                      html: function(){
	                           res.redirect("/products/" + product._id);
	                     },
	                    json: function(){
	                           res.json(product);
	                     }
	                  });
	           }
	        })
	    });
	})


	//DELETE 
	.delete(function (req, res){
	    mongoose.model('Product').findById(req.id, function (err, product) {
	        if (err) {
	            return console.error(err);
	        } else {
	            product.remove(function (err, product) {
	                if (err) {
	                    return console.error(err);
	                } else {
	                    res.format({
	                          html: function(){
	                               res.redirect("/products");
	                         },
	                        json: function(){
	                               res.json({message : 'deleted',
	                                   item : product
	                               });
	                         }
	                      });
	                }
	            });
	        }
	    });
	});

module.exports = router;