module.exports = function (app) {
  app.directive('jobForm', function () {
    return {
      templateUrl: './templates/job/job_form.html',
      scope: {
        linkApiJob: '='
      },
      require: '^^ngController',
      link: function ($scope, elem, attr, controller) {
        $scope.formHandler = function (event) {
          if(event.clipboardData){
            controller.getLink({
              url: event.clipboardData.getData('text/plain')
            });
          }
          $scope.showform = true;
        };


        $scope.$watch('linkApiJob', function () {
          if ($scope.linkApiJob.title) $scope.job.title = $scope.linkApiJob.title;
          if ($scope.linkApiJob.company) $scope.job.company = $scope.linkApiJob.company;
        });

        $scope.deleteJob = controller.deleteJob;

        $scope.submit = function (job) {
          console.log(job);
          controller.addJobs(job);
          $scope.job = {};
          $scope.showform = false;
        };
      }

    };
  });
};
