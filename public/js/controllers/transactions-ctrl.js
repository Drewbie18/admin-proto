(function () {
    var transactionsController = function (
        $scope,
        $http,
        $log,
        transactionsService,
        $q,
        $interval,
        uiGridConstants,
        transactionRowEditorService,
        transactionRowAddService,
        $mdDialog
    ) {

        var vm = this;
        var initialDataLoadFinished = 0;
        var numRecords = 0;
        $scope.vm = vm;


        vm.editRow = transactionRowEditorService.editRow;
        vm.addRow  = transactionRowAddService.addRow;
        vm.data = {};

        $scope.showConfirm = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title      ('Are you sure you wish to remove this record?')
                .textContent('Removing transaction record'                      )
                .ariaLabel  ('Removing record'                             )
                .targetEvent(ev                                            )
                .ok         ('Remove'                                      )
                .cancel     ('Cancel'                                      );
            $mdDialog.show(confirm).then(function() {
                $scope.status = 'Actually removing record.';
                vm.removeRow();
            }, function() {
                $scope.status = 'Cancelled removing record.';
            });
        };

        $scope.rowTemplate = function() {
            return '<div ng-dblclick="grid.appScope.vm.editRow(grid, row)" >' +
                '  <div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell></div>' +
                '</div>';
        };

        vm.transactionsGrid = {

            enableFiltering     : true,
            enableRowSelection  : true,
            showGridFooter      : true,
            multiSelect         : false,
            enableColumnResizing: true,
            rowTemplate         : $scope.rowTemplate(),

            columnDefs : [
                {
                    field          : '_id',
                    displayName    : 'ID',
                    resizable      : true,
                    cellTemplate   : 'views/edit-button.html',
                    enableCellEdit : false,
                    enableFiltering: true,
                    sort: {
                        direction: uiGridConstants.DESC,
                        ignoreSort: true,
                        priority: 0
                    }
                },
                {
                    field          : 'sender',
                    displayName    : 'Sender',
                    resizable      : true,
                    enableFiltering: true
                },
                {
                    field          : 'recipient',
                    displayName    : 'Recipient',
                    resizable      : true,
                    enableFiltering: true
                },
                {
                    field                   : 'state',
                    displayName             : 'State',
                    resizable               : true,
                    editableCellTemplate    : 'ui-grid/dropdownEditor',
                    cellFilter              : 'mapState',
                    editDropdownValueLabel  : 'state',
                    editDropdownOptionsArray: [
                        { id: "NEW"                 , state: 'New'                  },
                        { id: "PENDING_VERIFICATION", state: 'Pending Verification' },
                        { id: "VERIFIED"            , state: 'Verified'             },
                        { id: "QUEUED"              , state: 'Queued'               },
                        { id: "COMPLETE"            , state: 'Complete'             },
                        { id: "ERROR"               , state: 'Error'                }
                    ]
                }
            ]
        };

        vm.checkAndUpdateData = function(data) {
            if (data.errmsg != null) {
                console.log(data.errmsg);
            }
            else if (data.message != null) {
                console.log(data.message);
            }
            else {
                vm.data = data;
                vm.transactionsGrid.data = vm.data;
                //$scope.gridApi.grid.modifyRows(vm.data);
                console.log(data);
            }
        }

        vm.removeRow = function() {
            $scope.gridApi.grid.rows.forEach(function(item, index) {
                if (item.entity._id == $scope.selRowId) {
                    var idToDelete = item.entity._id;
                    transactionsService.delete(idToDelete)
                        .success(function(data) {
                            vm.checkAndUpdateData(data);
                        })
                        .error(function(data) {
                            console.log(data);
                        });
                }
            });
        };

        vm.dbSaveRow = function(rowEntity) {
            transactionsService.update(rowEntity)
                .success(function(data) {
                    vm.checkAndUpdateData(data);
                })
                .error(function(data) {
                    console.log(data);
                });
        };

        vm.dbAddRow = function(data) {
            transactionsService.create(data)
                .success(function(data) {
                    vm.checkAndUpdateData(data);
                })
                .error(function(data) {
                    console.log(data);
                });
        };

        vm.transactionsGrid.onRegisterApi = function(gridApi){
            //set gridApi on scope
            $scope.gridApi = gridApi;
            transactionRowAddService.setGrid(vm.transactionsGrid, gridApi);
            transactionRowEditorService.setTransactionsCtrl(vm);

            $scope.gridApi.grid.callDbAddRow = function(data) {
                vm.dbAddRow(data);
            };

            transactionsService.get()
                .success(function(data) {
                    vm.data = data;
                    vm.transactionsGrid.data = vm.data;
                    //$scope.gridApi.grid.modifyRows(vm.data);
                    console.log(data);
                    initialDataLoadFinished = 1;
                    numRecords = data.length;
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });

            gridApi.grid.registerDataChangeCallback(function(data) {
                if (initialDataLoadFinished) {
                    //if (data.rows.length > numRecords) vm.dbAddRow(data.rows[data.rows.length-1].entity);
                    numRecords = data.rows.length;
                    //vm.dbSaveRow(data.rows[$scope.selRowId].entity);
                }
            });

            gridApi.selection.on.rowSelectionChanged($scope, function(row) {
                $scope.rowSelected = row.isSelected;
                if (row.isSelected) {
                    $scope.selRowId = row.entity._id;
                }
            });
        };

        $scope.rowSelected = false;
    };

    transactionsController.$inject = [
        '$scope',
        '$http',
        '$log',
        'transactionsService',
        '$q',
        '$interval',
        'uiGridConstants',
        'transactionRowEditorService',
        'transactionRowAddService',
        '$mdDialog'
    ];

    angular.module('hi5-admin-app').controller('transactions-ctrl', transactionsController)
        .filter('mapState', function() {
            var stateHash = {
                'NEW'               : 'New'               ,
                'PENDING_ACTIVATION': 'Pending Activation',
                'ACTIVE'            : 'Active'            ,
                'SUSPENDED'         : 'Suspended'         ,
                'CLOSED'            : 'Closed'
            };

            return function(input) {
                if (!input){
                    return '';
                } else {
                    return stateHash[input];
                }
            };
        });
}());
