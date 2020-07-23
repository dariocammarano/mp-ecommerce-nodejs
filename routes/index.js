var express = require('express');
var router = express.Router();
var controller = require("../controllers/mercadoPago.js")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/detail', function(req, res, next) {
res.render('detail', req.query);
});

router.get('/payment/success', controller.getBackUrlSuccess);
router.get('/payment/failure', controller.getBackUrlFailure);
router.get('/payment/pending', controller.getBackUrlPending);
router.get('/payment/webhook', controller.getWebHook);

router.post('/pagar', controller.create);
  

module.exports = router;

