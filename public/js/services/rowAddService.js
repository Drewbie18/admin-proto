(function () {
    var rowAddService = function($rootScope, $modal) {

        var factory = {};

        factory.addRow = function() {
            $modal.open({
                templateUrl: '/views/add-modal.html',
                controller: ['$modalInstance', 'ClientSchema', 'grid', 'gridApi', '$scope', rowAddController],
                controllerAs: 'vm',
                resolve: {
                    grid: function () {
                        return $rootScope.grid;
                    },
                    gridApi: function () {
                        return $rootScope.gridApi;
                    }
                }
            });
        };

        factory.setGrid = function(grid, gridApi) {
            $rootScope.grid    = grid;
            $rootScope.gridApi = gridApi;
        };

        return factory;
    };

    rowAddService.$inject = ['$rootScope', '$modal'];

    angular.module('hi5-admin-app').factory('rowAddService', rowAddService);

    var rowAddController = function ($modalInstance, ClientSchema, grid, gridApi, $scope) {
        var vm = this;

        vm.schema = ClientSchema;
        vm.form = [
            {
                'key'  : 'firstName',
                'type' :'text',
                'title': 'First Name'
            },
            {
                'key'  : 'lastName',
                'type' :'text',
                'title': 'Last Name'
            },
            {
                'key'  : 'email',
                'type' :'text',
                'title': 'Email Address'
            },
            {
                'key'  : 'phone',
                'type' :'text',
                'title': 'Phone Number'
            },
            {
                'key'  : 'password',
                'type' :'password',
                'title': 'Password'
            },
            /*{
                'key'  : 'registrationDate',
                'type' :'text',
                'title': 'Registration Date'
            },*/
            {
                'key'  : 'companyName',
                'type' :'text',
                'title': 'Company Name'
            },
            {
                'key'  : 'sitUrl',
                'type' :'text',
                'title': 'Site URL'
            },
            {
                "key"     : "state",
                'type'    :'select',
                "title"   : "State",
                'titleMap': [
                    { value: "NEW"               , name: "New"                },
                    { value: "PENDING_ACTIVATION", name: "Pending Activation" },
                    { value: "ACTIVE"            , name: "Active"             },
                    { value: "SUSPENDED"         , name: "Suspended"          },
                    { value: "CLOSED"            , name: "Closed"             }
                ]
            }
        ];
        vm.entity = {};
        vm.grid = grid;
        vm.gridApi = gridApi;
        vm.add = function (form) {
            $scope.$broadcast('schemaFormValidate');
            if (form.$valid) {
                //vm.grid.data.push(vm.entity);
                vm.gridApi.grid.callDbAddRow(vm.entity);
                $modalInstance.close();
            }
        }
    };

    angular.module('hi5-admin-app').controller('row-add-ctrl', rowAddController);

}());