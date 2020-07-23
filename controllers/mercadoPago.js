var mercadopago = require('mercadopago');
var fs = require('fs');

mercadopago.configure({
    integrator_id: 'dev_24c65fb163bf11ea96500242ac130004',
    access_token: 'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398'
});

module.exports = {
    create: async function(req, res, next) {

        var preference = {
            external_reference: 'dari_roj@hotmail.com',
            payer: {
                name: 'Lalo',
                surname: 'Landa',
                email: 'test_user_63274575@testuser.com',
                phone: {
                    area_code: '11',
                    number: 22223333
                },
                address: {
                    zip_code: "1111",
                    street_name: "False",
                    street_number: 123
                }
            },
            back_urls: {
                success: 'dcammarano-mp-ecommerce-nodejs.herokuapp.com/payment/success',
                pending: 'dcammarano-mp-ecommerce-nodejs.herokuapp.com/payment/pending',
                failure: 'dcammarano-mp-ecommerce-nodejs.herokuapp.com/payment/failure'
            },
            notification_url: 'dcammarano-mp-ecommerce-nodejs.herokuapp.com/payment/webhook',
            auto_return: "approved",
            items: [
                {
                    id: 1234,
                    title: req.body.title,
                    description: "​Dispositivo móvil de Tienda e-commerce",
                    quantity: 1,
                    currency_id: 'ARS',
                    picture_url: 'https://dcammarano-mp-ecommerce-nodejs.herokuapp.com/'+req.body.img,
                    unit_price: parseInt(req.body.price),
                }
            ],
            payment_methods : {
                    excluded_payment_methods : [
                        {
                            id: 'amex'
                        }
                    ], 
                    excluded_payment_types: [
                        {
                            id: 'atm'
                        }
                    ],
                installments: 6
            }
        };
      
        let mercado = await mercadopago.preferences.create(preference);
        //console.log(mercado.body.init_point);
        //res.json(mercado);
        res.redirect(mercado.body.init_point);

    },
    
    getBackUrlSuccess: async function(req, res, next) {
        //console.log(req.query)
        res.render('success', req.query);
    },

    getBackUrlFailure: async function(req, res, next) {
        //console.log(req.query)
        res.render('failure', req.query);
    },
    
    getBackUrlPending: async function(req, res, next) {
        //console.log(req.query)
        res.render('pending', req.query);
    },


    getWebHook: function (req, res) { 
        /*let body = ""; 
        req.on("data", chunk => {  
            body += chunk.toString();
        });
        req.on("end", () => {  */
            console.log(req.body, "webhook response"); 
        /*res.end("ok");
        });*/

        return res.status(200); 
    },
        

    getHook: async function(req, res, next){
        var finalresponse = {};
        fs.readFile('hook2.json', (err, data) => {
            if (err) throw err;
            res.status(200).json(JSON.parse(data.toString()));
        });
    }
}