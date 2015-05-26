(function(){

  angular
    .module('photoX')
    .controller('agencySchedulerListController', agencySchedulerListController);

    agencySchedulerListController.$inject = ['tableService', '$scope'];

  function agencySchedulerListController(tableService, $scope) {

    $scope.tableData = [];

    tableService
      .loadAllItems()
      .then(function(tableData) {
        $scope.tableData = [].concat(tableData);
      });
  }

})();
