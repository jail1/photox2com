(function(){

  angular
    .module('photoX')
    .controller('MessagesController', MessagesController);

    MessagesController.$inject = ['messagesService'];

  function MessagesController(messagesService) {
    var vm = this;

    vm.messages = [];

    messagesService
      .loadAllItems()
      .then(function(messages) {
        vm.messages = [].concat(messages);
      });
  }

})();
