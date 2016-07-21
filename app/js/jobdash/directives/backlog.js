module.exports = function (app) {

  let updateListItem = function (newList, oldList) {

    var bIds = {};
    oldList.forEach(function (obj) {
      bIds[obj._id] = obj;
    });

    // Return all elements in A, unless in B
    let delta = newList.filter(function (obj) {
      return !(obj._id in bIds);
    });
    return delta;
  };

  app.directive('backlogView', function () {
    return {
      templateUrl: './templates/job/backlog.html',
      scope: {
        backlog: '=',
        today: '=',
        backlogshow: '=',
        listtitle: '@'

      },
      require: '^^ngController',
      link: function($scope, elem, attr, controller) {
        $scope.jobClick = controller.jobClick;

        $scope.$watch('today', function (newModel, oldModel) {
          let delta = updateListItem(newModel, oldModel);
          if (delta.length == 1) {
            delta[0].isToday = true;
            controller.updateJobs(delta[0]);
          }
        }, true);

        $scope.$watch('backlog', function (newModel, oldModel) {
          let delta = updateListItem(newModel, oldModel);
          if (delta.length == 1) {
            delta[0].isToday = false;
            controller.updateJobs(delta[0]);
          }
        }, true);
      }
    };
  });
};
