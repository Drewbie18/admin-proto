(function () {
    var transactionRowAddService = function($rootScope, $modal) {

        var factory = {};

        factory.addRow = function() {
            $modal.open({
                templateUrl: '/views/transaction-add-modal.html',
                controller: ['$modalInstance', 'TransactionSchema', 'grid', 'gridApi', '$scope', transactionAddController],
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

    transactionRowAddService.$inject = ['$rootScope', '$modal'];

    angular.module('hi5-admin-app').factory('transactionRowAddService', transactionRowAddService);

    var transactionAddController = function ($modalInstance, TransactionSchema, grid, gridApi, $scope) {
        var vm = this;

        vm.schema = TransactionSchema;
        vm.form = [
            {
                field          : 'timestamp',
                displayName    : 'Timestamp',
                resizable      : true,
                enableFiltering: true,
                type           : 'date',
                cellFilter     : 'date:"yyyy-MM-dd"'
            },
            {
                'key'  : 'sender',
                'type' : 'text',
                'title': 'Sender'
            },
            {
                'key'  : 'recipient',
                'type' : 'text',
                'title': 'Recipient'
            },
            {
                "key"     : "state",
                'type'    : 'select',
                "title"   : "State",
                'titleMap': [
                    { value: "NEW"                 , name: "New"                  },
                    { value: "PENDING_VERIFICATION", name: "Pending Verification" },
                    { value: "VERIFIED"            , name: "Verified"             },
                    { value: "QUEUED"              , name: "Queued"               },
                    { value: "COMPLETE"            , name: "Complete"             },
                    { value: "ERROR"               , name: "Error"                }
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

    angular.module('hi5-admin-app').controller('transaction-row-add-ctrl', transactionAddController);

}());