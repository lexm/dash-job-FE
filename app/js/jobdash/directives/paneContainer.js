module.exports = function (app) {

  app.directive('paneContainer', function () {
    return {
      templateUrl: './templates/clickPanes/paneContainer.html',
      scope: {
        backlog: '=',
        today: '=',
        inprocess: '=',
        applied: '='
      },
      require: '^^ngController',
      link: function ($scope, elem, attr, controller) {
        $scope.$watch('backlog', function () {
          $scope.backlogCount = $scope.backlog.length;

        }, true);

        $scope.$watch('today', function () {
          $scope.todayCount = $scope.today.length;
        }, true);

        $scope.$watch('inprocess', function () {
          $scope.inprocessCount = $scope.inprocess.length;
        }, true);

        $scope.$watch('applied', function () {
          $scope.appliedCount = $scope.applied.length;
        }, true);

        $scope.todayclick = function (){
          controller.showjobevents = true;
          controller.showbacklog = false;
          controller.joblist = controller.today;
          controller.backlogshow = false;
          let myEl = angular.element( document.querySelector( 'div.three.columns.pane.today' ) );
          myEl.addClass('paneslected');
          myEl = angular.element( document.querySelector( 'div.three.columns.pane.backlog' ) );
          myEl.removeClass('paneslected');
          myEl = angular.element( document.querySelector( 'div.three.columns.pane.inprogress' ) );
          myEl.removeClass('paneslected');
          myEl = angular.element( document.querySelector( 'div.three.columns.pane.applied' ) );
          myEl.removeClass('paneslected');
          controller.listtitle = 'Today'

        };

        $scope.backlogclick = function (){
          controller.showjobevents = false;
          controller.showbacklog = true;
          controller.backlogshow = true;
          let myEl = angular.element( document.querySelector( 'div.three.columns.pane.today' ) );
          myEl.removeClass('paneslected');
          myEl = angular.element( document.querySelector( 'div.three.columns.pane.backlog' ) );
          myEl.addClass('paneslected');
          myEl = angular.element( document.querySelector( 'div.three.columns.pane.inprogress' ) );
          myEl.removeClass('paneslected');
          myEl = angular.element( document.querySelector( 'div.three.columns.pane.applied' ) );
          myEl.removeClass('paneslected');
          controller.listtitle = 'Today'
        };

        $scope.inprocessclick = function (){
          controller.showjobevents = true;
          controller.showbacklog = false;
          controller.joblist = controller.inprocess;
          controller.backlogshow = false;
          let myEl = angular.element( document.querySelector( 'div.three.columns.pane.today' ) );
          myEl.removeClass('paneslected');
          myEl = angular.element( document.querySelector( 'div.three.columns.pane.backlog' ) );
          myEl.removeClass('paneslected');
          myEl = angular.element( document.querySelector( 'div.three.columns.pane.inprogress' ) );
          myEl.addClass('paneslected');
          myEl = angular.element( document.querySelector( 'div.three.columns.pane.applied' ) );
          myEl.removeClass('paneslected');
          controller.listtitle = 'In Process'
        };

        $scope.appliedclick = function (){
          controller.showjobevents = true;
          controller.showbacklog = false;
          controller.joblist = controller.applied;
          controller.backlogshow = false;
          let myEl = angular.element( document.querySelector( 'div.three.columns.pane.today' ) );
          myEl.removeClass('paneslected');
          myEl = angular.element( document.querySelector( 'div.three.columns.pane.backlog' ) );
          myEl.removeClass('paneslected');
          myEl = angular.element( document.querySelector( 'div.three.columns.pane.inprogress' ) );
          myEl.removeClass('paneslected');
          myEl = angular.element( document.querySelector( 'div.three.columns.pane.applied' ) );
          myEl.addClass('paneslected');
          controller.listtitle = 'Applied'
        };
      },
      controller: ['$scope', function($scope) {
        $scope.appliedclick = function (){alert();};
      }]
    };
  });
};
