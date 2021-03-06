var Client      = require('./models/common/client'     );
var Token       = require('./models/common/token'      );
var Transaction = require('./models/common/transaction');
var User        = require('./models/common/user'       );

module.exports = function (app) {
    // api ---------------------------------------------------------------------
    // get all clients
    app.get('/api/clients', function (req, res) {

        // use mongoose to get all clients in the database
        Client.find(function (err, clients) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) res.send(err);
            else     res.json(clients); // return all clients in JSON format
        });
    });

    // create client and send back all clients after creation
    app.post('/api/clients', function (req, res) {

        // create a transaction, information comes from AJAX request from Angular
        Client.create(req.body, function (err, client) {
            if (err) res.send(err);
            else {
                // get and return all the clients after you create another
                Client.find(function (err, clients) {
                    if (err) res.send(err);
                    else     res.json(clients);
                });
            }
        });

    });

    // update a client
    app.put('/api/clients/:client_id', function (req, res) {

        Client.findOne({_id: req.params.client_id}, function (err, client) {
            if (err) res.send(err);
            else {
                client.firstName        = req.body.firstName       ;
                client.lastName         = req.body.lastName        ;
                client.email            = req.body.email           ;
                client.phone            = req.body.phone           ;
                client.password         = req.body.password        ;
                client.registrationDate = req.body.registrationDate;
                client.companyName      = req.body.companyName     ;
                client.siteUrl          = req.body.siteUrl         ;
                client.state            = req.body.state           ;
                
                client.save(function (err) {
                    if (err) res.send(err);
                    else {
                        // use mongoose to get all clients in the database
                        Client.find(function (err, clients) {

                            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                            if (err) res.send(err)
                            else     res.json(clients); // return all clients in JSON format
                        });
                    }
                });
            }
        });


    });

    // delete a client
    app.delete('/api/clients/:client_id', function (req, res) {
        Client.remove({
            _id: req.params.client_id
        }, function (err, client) {
            if (err) res.send(err);
            else {
                // get and return all the clients after you create another
                Client.find(function (err, clients) {
                    if (err) res.send(err);
                    else     res.json(clients);
                });
            }
        });
    });

    // get all tokens
    app.get('/api/tokens', function (req, res) {

        // use mongoose to get all tokens in the database
        Token.find(function (err, tokens) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) res.send(err);
            else     res.json(tokens); // return all tokens in JSON format
        });
    });

    // create token and send back all tokens after creation
    app.post('/api/tokens', function (req, res) {

        // create a transaction, information comes from AJAX request from Angular
        Token.create(req.body, function (err, token) {
            if (err) res.send(err);
            else {
                // get and return all the tokens after you create another
                Token.find(function (err, tokens) {
                    if (err) res.send(err);
                    else     res.json(tokens);
                });
            }
        });

    });

    // update a token
    app.put('/api/tokens/:token_id', function (req, res) {

        Token.findOne({_id: req.params.token_id}, function (err, token) {
            if (err) res.send(err);
            else {
                token.mintDate     = req.body.mintDate    ;
                token.mintedAmount = req.body.mintedAmount;
                token.currentOwner = req.body.currentOwner;
                token.history      = req.body.history     ;
                token.state        = req.body.state       ;

                token.save(function (err) {
                    if (err) res.send(err);
                    else {
                        // use mongoose to get all tokens in the database
                        Token.find(function (err, tokens) {

                            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                            if (err) res.send(err)
                            else     res.json(tokens); // return all clients in JSON format
                        });
                    }
                });
            }
        });
    });

    // delete a token
    app.delete('/api/tokens/:token_id', function (req, res) {
        Client.remove({
            _id: req.params.token_id
        }, function (err, token) {
            if (err) res.send(err);
            else {
                // get and return all the tokens after you create another
                Token.find(function (err, tokens) {
                    if (err) res.send(err);
                    else     res.json(tokens);
                });
            }
        });
    });


    // get all transactions
    app.get('/api/transactions', function (req, res) {

        // use mongoose to get all transactions in the database
        Transaction.find(function (err, transactions) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) res.send(err);
            else     res.json(transactions); // return all transactions in JSON format
        });
    });

    // create transaction and send back all transaction after creation
    app.post('/api/transactions', function (req, res) {

        // create a transaction, information comes from AJAX request from Angular
        Transaction.create(req.body, function (err, transaction) {
            if (err) res.send(err);
            else {
                // get and return all the transactions after you create another
                Transaction.find(function (err, transactions) {
                    if (err) res.send(err);
                    else     res.json(transactions);
                });
            }
        });

    });

    // update a transaction
    app.put('/api/transactions/:transaction_id', function (req, res) {

        Transaction.findOne({_id: req.params.transaction_id}, function (err, transaction) {
            if (err) res.send(err);
            else {
                transaction.timestamp = req.body.timestamp;
                transaction.sender    = req.body.sender   ;
                transaction.recipient = req.body.recipient;
                transaction.tokens    = req.body.tokens   ;
                transaction.state     = req.body.state    ;

                transaction.save(function (err) {
                    if (err) res.send(err);
                    else {
                        // use mongoose to get all transactions in the database
                        Transaction.find(function (err, transactions) {

                            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                            if (err) res.send(err)
                            else     res.json(transactions); // return all clients in JSON format
                        });
                    }
                });
            }
        });
    });

    // delete a transaction
    app.delete('/api/transactions/:transaction_id', function (req, res) {
        Transaction.remove({
            _id: req.params.transaction_id
        }, function (err, transaction) {
            if (err) res.send(err);
            else {
                // get and return all the transactions after you create another
                Transaction.find(function (err, transactions) {
                    if (err) res.send(err);
                    else     res.json(transactions);
                });
            }
        });
    });


    // get all users
    app.get('/api/users', function (req, res) {

        // use mongoose to get all users in the database
        User.find(function (err, users) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) res.send(err);
            else     res.json(users); // return all users in JSON format
        });
    });

    // create user and send back all users after creation
    app.post('/api/users', function (req, res) {

        // create a user, information comes from AJAX request from Angular
        User.create(req.body, function (err, user) {
            if (err) res.send(err);
            else {
                // get and return all the users after you create another
                User.find(function (err, users) {
                    if (err) res.send(err);
                    else     res.json(users);
                });
            }
        });

    });

    // update a user
    app.put('/api/users/:user_id', function (req, res) {

        User.findOne({_id: req.params.user_id}, function (err, user) {
            if (err) res.send(err);
            else {
                user.name             = req.body.name            ;
                user.firstName        = req.body.firstName       ;
                user.lastName         = req.body.lastName        ;
                user.email            = req.body.email           ;
                user.phone            = req.body.phone           ;
                user.password         = req.body.password        ;
                user.registrationDate = req.body.registrationDate;
                user.state            = req.body.state           ;
                user.tokens           = req.body.tokens          ;
                user.history          = req.body.history         ;

                user.save(function (err) {
                    if (err) res.send(err);
                    else {
                        // use mongoose to get all transactions in the database
                        User.find(function (err, users) {

                            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                            if (err) res.send(err)
                            else     res.json(users); // return all clients in JSON format
                        });
                    }
                });
            }
        });
    });

    // delete a user
    app.delete('/api/users/:user_id', function (req, res) {
        User.remove({
            _id: req.params.user_id
        }, function (err, user) {
            if (err) res.send(err);
            else {
                // get and return all the users after you create another
                User.find(function (err, users) {
                    if (err) res.send(err)
                    else     res.json(users);
                });
            }
        });
    });

    // application -------------------------------------------------------------
    app.get('/*', function (req, res) {
        res.sendFile('/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

}