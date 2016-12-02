(function () {
    var transactionRowEditorService = function ($rootScope, $modal) {

        var factory = {};
        factory.editRow = function (grid, row) {
            $modal.open({
                templateUrl: '/views/transaction-edit-modal.html',
                controller: ['$modalInstance', 'TransactionSchema', 'grid', 'row', 'transactionsCtrl', transactionRowEditController],
                controllerAs: 'vm',
                resolve: {
                    grid: function () {
                        return grid;
                    },
                    row: function () {
                        return row;
                    },
                    transactionsCtrl: function () {
                        return $rootScope.transactionsCtrl;
                    }
                }
            });
        };

        factory.setTransactionsCtrl = function(ctrl) {
            $rootScope.transactionsCtrl = ctrl;
        };

        return factory;
    };

    transactionRowEditorService.$inject = ['$rootScope', '$modal'];

    angular.module('hi5-admin-app').factory('transactionRowEditorService', transactionRowEditorService);




    var transactionRowEditController = function ($modalInstance, TransactionSchema, grid, row, transactionsCtrl) {
        var vm = this;
        
        vm.schema = TransactionSchema;
        vm.entity = angular.copy(row.entity);
        vm.transactionsCtrl = transactionsCtrl;
        vm.form = [
            {
                'key'  : 'timestamp',
                'type' : 'text',
                'title': 'Timestamp'
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

        vm.grid = grid;
        vm.row = row;
        vm.save = function () {
            // Copy row values over
            row.entity = angular.extend(row.entity, vm.entity);
            $modalInstance.close(row.entity);
            transactionsCtrl.dbSaveRow(row.entity);
        }
    };

    angular.module('hi5-admin-app').controller('transaction-row-edit-ctrl', transactionRowEditController);

}());