(function(){

  angular
    .module('photoX')
    .controller('MessagesController', MessagesController);

    MessagesController.$inject = ['messagesService', 'localize'];

  function MessagesController(messagesService, localize) {
    var vm = this;

    vm.messages = [];

    messagesService
      .loadAllItems()
      .then(function(messages) {
        vm.messages = [].concat(messages);
      });
  }

})();
