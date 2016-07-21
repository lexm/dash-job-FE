module.exports = function(app){
  app.directive('jobCard', function(){
    return {
      templateUrl:'./templates/job/job_card.html',
      scope: {
        job:'='
      }
    };
  });
};
