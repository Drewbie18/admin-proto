var hi5AdminApp = angular.module('hi5-admin-app', [
    'ngRoute'/*,
    'ngAnimate',
    'ui.bootstrap'*/
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
