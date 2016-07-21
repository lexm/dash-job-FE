module.exports = function (app) {
  app.directive('eventForm', function (globals) {
    return {
      templateUrl: './templates/job/eventForm.html',
      scope: {
        job: '='
      },

      require: '^^ngController',
      link: function ($scope, elem, attr, controller) {
        $scope.addEvent = function (event) {
          event.jobId = $scope.job._id;
          event.typeId = $scope.selected.id;
          event.value = $scope.selected.value;
          controller.addEvent(event);
        };
      },
      controller: function ($scope) {
        $scope.items = globals.eventTypes;
      }
    };
  });
};
