(function(){

  angular
    .module('photoX')
    .controller('ProgressController', ProgressController);

    ProgressController.$inject = ['$scope' ,'progressService', '$q', 'localize'];

  function ProgressController($scope, progressService, $q, localize) {
    var vm = this;

    vm.progressData = {};
    vm.progressPeriod = 'week';
    vm.changePeriod = changePeriod;

    activate();

    function activate() {
      var queries = [loadData()];
      $q.all(queries);
    }


    function loadData() {
      vm.progressData = progressService.getProgressData(vm.progressPeriod);
    }

    function changePeriod() {
      loadData();
    }
  }
})();
