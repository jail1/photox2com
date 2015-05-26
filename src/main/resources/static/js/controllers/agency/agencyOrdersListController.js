(function() {
    "use strict";
    angular.module('photoX').controller('agencyOrdersListCtrl', agencyOrdersListController);

    agencyOrdersListController.$inject = ['$scope', '$rootScope', '$state', '$log', 'moment', '$mdDialog', '$mdSidenav', '$mdBottomSheet'];

    function agencyOrdersListController($scope, $rootScope, $state, $log, moment, $mdDialog, $mdSidenav, $mdBottomSheet){
        $scope.add = function () {
            //TODO : make it go to state
            $state.go('');
        }
    }
}).call(this);