(function(){

  angular
    .module('photoX')
    .controller('agencySchedulerListController', agencySchedulerListController);

    agencySchedulerListController.$inject = ['tableService', '$scope', 'localize'];

  function agencySchedulerListController(tableService, $scope, localize) {

    $scope.tableData = [];

    tableService
      .loadAllItems()
      .then(function(tableData) {
        $scope.tableData = [].concat(tableData);
      });
  }

})();
