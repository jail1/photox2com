(function(){

  angular
    .module('photoX')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$scope', 'localize'];

  function ProfileController($scope, localize) {

    var vm = this;

    vm.user = {
      title: 'Admin',
      email: 'contact@flatlogic.com',
      firstName: '',
      lastName: '' ,
      company: 'FlatLogic Inc.' ,
      address: 'Kulman street, 1' ,
      city: 'Minsk' ,
      state: '' ,
      biography: 'We are young and ambitious full service design and technology company. ' +
      'Our focus is JavaScript development and User Interface design.',
      postalCode : '220013'
    };
  }

})();
