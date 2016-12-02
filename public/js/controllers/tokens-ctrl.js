(function () {
    var tokensController = function (
        $scope,
        $http,
        $log,
        tokensService,
        $q,
        $interval,
        uiGridConstants,
        tokenRowEditorService,
        tokenRowAddService,
        $mdDialog
    ) {

        var vm = this;
        var initialDataLoadFinished = 0;
        var numRecords = 0;
        $scope.vm = vm;


        vm.editRow = tokenRowEditorService.editRow;
        vm.addRow  = tokenRowAddService.addRow;
        vm.data = {};

        $scope.showConfirm = function(ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                .title      ('Are you sure you wish to remove this token?')
                .textContent('Removing token record'                      )
                .ariaLabel  ('Removing record'                            )
                .targetEvent(ev                                           )
                .ok         ('Remove'                                     )
                .cancel     ('Cancel'                                     );
            $mdDialog.show(confirm).then(function() {
                $scope.status = 'Actually removing record.';
                vm.removeRow();
            }, function() {
                $scope.status = 'Cancelled removing record.';
            });
        };

        vm.tokensGrid = {

            enableFiltering     : true,
            enableRowSelection  : true,
            showGridFooter      : true,
            multiSelect         : false,
            enableColumnResizing: true,

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
                    field          : 'mintDate',
                    displayName    : 'Minting Date',
                    resizable      : true,
                    enableFiltering: true,
                    type           : 'date',
                    cellFilter     : 'date:"yyyy-MM-dd"'
                },
                {
                    field          : 'mintedAmount',
                    displayName    : 'Amount Minted',
                    resizable      : true,
                    enableFiltering: true
                },
                {
                    field          : 'currentOwner',
                    displayName    : 'Owner',
                    resizable      : true,
                    enableFiltering: true
                },
                {
                    field          : 'history',
                    displayName    : 'History',
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
                        { id: "NEW"       , state: 'New'        },
                        { id: "CONFIRMED" , state: 'Confirmed'  },
                        { id: "ACTIVE"    , state: 'Active'     },
                        { id: "INACTIVE"  , state: 'Inactive'   },
                        { id: "IN_TRANSIT", state: 'In transit' },
                        { id: "REVOKED"   , state: 'Revoked'    }
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
                vm.tokenGrid.data = vm.data;
                //$scope.gridApi.grid.modifyRows(vm.data);
                console.log(data);
            }
        }

        vm.removeRow = function() {
            $scope.gridApi.grid.rows.forEach(function(item, index) {
                if (item.entity._id == $scope.selRowId) {
                    var idToDelete = item.entity._id;
                    tokensService.delete(idToDelete)
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
            tokensService.update(rowEntity)
                .success(function(data) {
                    vm.checkAndUpdateData(data);
                })
                .error(function(data) {
                    console.log(data);
                });
        };

        vm.dbAddRow = function(data) {
            tokensService.create(data)
                .success(function(data) {
                    vm.checkAndUpdateData(data);
                })
                .error(function(data) {
                    console.log(data);
                });
        };

        vm.tokensGrid.onRegisterApi = function(gridApi){
            //set gridApi on scope
            $scope.gridApi = gridApi;
            tokenRowAddService.setGrid(vm.tokenGrid, gridApi);
            tokenRowEditorService.setTokensCtrl(vm);

            $scope.gridApi.grid.callDbAddRow = function(data) {
                vm.dbAddRow(data);
            };

            tokensService.get()
                .success(function(data) {
                    vm.data = data;
                    vm.tokensGrid.data = vm.data;
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

            gridApi.rowEdit.on.saveRow($scope, vm.dbSaveRow);
        };

        $scope.rowSelected = false;
    };

    tokensController.$inject = [
        '$scope',
        '$http',
        '$log',
        'tokensService',
        '$q',
        '$interval',
        'uiGridConstants',
        'tokenRowEditorService',
        'tokenRowAddService',
        '$mdDialog'
    ];

    angular.module('hi5-admin-app').controller('tokens-ctrl', tokensController)
        .filter('mapState', function() {
            var stateHash = {
                'NEW'       : 'New'       ,
                'CONFIRMED' : 'Confirmed' ,
                'ACTIVE'    : 'Active'    ,
                'INACTIVE'  : 'Inactive'  ,
                'IN_TRANSIT': 'In Transit',
                'REVOKED'   : 'Revoked'
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
