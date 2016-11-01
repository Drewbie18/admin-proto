(function () {
    var clientsController = function ($scope, $http, $log, clientsService) {
        $scope.tagline = 'Clients page';

        var myClient = {
            firstName   : "Jane",
            lastName    : "Doe",
            email       : "janedoe@gmail.com",
            phone       : "1-613-123-4567",
            password    : "mypassword",
            companyName : "ACME",
            siteUrl     : "https://www.acme.com/",
            state       : "NEW"
        };

        clientsService.create(myClient)
            .success(function(data) {
                $scope.clients = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });

    };

    clientsController.$inject = ['$scope', '$http', '$log', 'clientsService'];
    angular.module('hi5-admin-app').controller('clients-ctrl', clientsController);
}());
