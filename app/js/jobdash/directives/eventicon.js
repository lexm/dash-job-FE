module.exports = function (app) {
  app.directive('eventIcon', function () {

    //change template based on eventtypeid
    //also need fucntion in service in global to return event give an id
    // <!-- <span class="glyphicon glyphicon-phone-alt" aria-hidden="true"></span> -->
    return {
      scope: {
        eventtypeid: '='
      },
      template: '<span class=\"glyphicon glyphicon-phone-alt\" aria-hidden=\"true\"></span>'
    };
  });
};
