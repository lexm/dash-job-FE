module.exports = function (app) {
  app.factory('globals', function () {
    let service = {};

    service.eventTypes = [{
      id: 1,
      label: 'Application Submitted',
      value: 1,
      icon: 'glyphicon glyphicon-send'
    }, {
      id: 2,
      label: 'Phone Screen',
      value: 2,
      icon: 'glyphicon glyphicon-phone-alt'
    }, {
      id: 2,
      label: 'Email',
      value: 2,
      icon: 'glyphicon glyphicon-envelope'
    }, {
      id: 3,
      label: 'Phone Interview',
      value: 2,
      icon: 'glyphicon glyphicon-phone-alt'
    }, {
      id: 4,
      label: 'In Person Interview',
      value: 2,
      icon: 'glyphicon glyphicon-user'
    }, {
      id: 4,
      label: 'Offer',
      value: 3,
      icon: 'glyphicon glyphicon-usd'
    }];

    service.returnEventbyID = function (id) {
      this.eventTypes.filter(function(i){
        return id == i.id;
      });
    };

    return service;
  });
};
