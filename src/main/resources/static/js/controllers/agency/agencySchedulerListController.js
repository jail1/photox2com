(function(){

  angular
    .module('photoX')
    .controller('agencySchedulerListController', agencySchedulerListController);

    agencySchedulerListController.$inject = ['tableService'];

  function agencySchedulerListController(tableService) {
    var vm = this;

    vm.tableData = [];

    tableService
      .loadAllItems()
      .then(function(tableData) {
        vm.tableData = [].concat(tableData);
      });
  }

})();
