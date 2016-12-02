var hi5AdminApp = angular.module('hi5-admin-app', [
    'ngRoute',
    'ui.grid',
    'ui.grid.resizeColumns',
    'ui.grid.cellNav',
    'ui.grid.selection',
    'ui.bootstrap',
    'schemaForm',
    'ngMaterial',
    'ngMessages'
]);

hi5AdminApp.config(function ($logProvider) {
    $logProvider.debugEnabled(true);
});

hi5AdminApp.config(function ($routeProvider) {
    $routeProvider
        // home page
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'main-ctrl'
        })

        // clients page that will use the ClientsController
        .when('/clients', {
            templateUrl: 'views/clients.html',
            controller: 'clients-ctrl'
        })

        // tokens page that will use the TokensController
        .when('/tokens', {
            templateUrl: 'views/tokens.html',
            controller: 'tokens-ctrl'
        })

        // transactions page that will use the TransactionsController
        .when('/transactions', {
            templateUrl: 'views/transactions.html',
            controller: 'transactions-ctrl'
        })

        // users page that will use the UsersController
        .when('/users', {
            templateUrl: 'views/users.html',
            controller: 'users-ctrl'
        });

    //$locationProvider.html5Mode(true);
});

hi5AdminApp.constant('ClientSchema', {
    type: 'object',
    properties: {
        firstName : {
            type : 'string',
            title: 'First Name'
        },
        lastName : {
            type : 'string',
            title: 'Last Name'
        },
        email : {
            type : 'string',
            title: 'Email Address'
        },
        phone : {
            type : 'string',
            title: 'Phone Number'
        },
        password : {
            type : 'string',
            title: 'Password'
        },
        registrationDate : {
         type : Date,
         title: Date.now()
        },
        companyName : {
            type : 'string',
            title: 'Company Name'
        },
        siteUrl : {
            type : 'string',
            title: 'Site URL'
        },
        state : {
            type : 'string',
            title: 'State'
            /*enum: [
             'NEW',
             'PENDING_ACTIVATION',
             'ACTIVE',
             'SUSPENDED',
             'CLOSED'
             ]*/
        }
        /*tokens : {
         type : [mongoose.Schema.Types.ObjectId]
         },
         history : {
         type : [mongoose.Schema.Types.ObjectId]
         }*/
    }
});

hi5AdminApp.constant('TokenSchema', {
    type: 'object',
    properties: {
        mintDate : {
         type : Date,
         title: Date.now()
         },
        mintedAmount : {
            type : 'string',
            title: 'Amount Minted'
        },
        currentOwner : {
            type : 'string',
            title: 'Owner'
        },
        history : {
            type : 'string',
            title: 'History'
        },
        state : {
            type : 'string',
            title: 'State'
            /*enum: [
             'NEW',
             'CONFIRMED',
             'ACTIVE',
             'INACTIVE',
             'IN_TRANSIT',
             'REVOKED'
             ]*/
        }
    }
});

hi5AdminApp.constant('TransactionSchema', {
    type: 'object',
    properties: {
         timestamp : {
         type : Date,
         title: Date.now()
         },
        sender : {
            type : 'string',
            title: 'Sender'
        },
        recipient : {
            type : 'string',
            title: 'Recipient'
        },
        state : {
            type : 'string',
            title: 'State'
            /*enum: [
             'NEW',
             'CONFIRMED',
             'ACTIVE',
             'INACTIVE',
             'IN_TRANSIT',
             'REVOKED'
             ]*/
        }
    }
});

hi5AdminApp.constant('UserSchema', {
    type: 'object',
    properties: {
        name : {
            type : 'string',
            title: 'User Name'
        },
        firstName : {
            type : 'string',
            title: 'First Name'
        },
        lastName : {
            type : 'string',
            title: 'Last Name'
        },
        email : {
            type : 'string',
            title: 'Email Address'
        },
        phone : {
            type : 'string',
            title: 'Phone Number'
        },
        password : {
            type : 'string',
            title: 'Password'
        },
        registrationDate : {
            type : Date,
            title: Date.now()
        },
        state : {
            type : 'string',
            title: 'State'
            /*enum: [
             'NEW',
             'PENDING_ACTIVATION',
             'ACTIVE',
             'SUSPENDED',
             'CLOSED'
             ]*/
        }
        /*tokens : {
         type : [mongoose.Schema.Types.ObjectId]
         },
         history : {
         type : [mongoose.Schema.Types.ObjectId]
         }*/
    }
});