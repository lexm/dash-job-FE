const angular = require('angular');
require('angular-mocks');
require('../app/js/client.js');

const backLog = require('../app/templates/job/backlog.html');
const pane = require('../app/templates/clickPanes/pane.html');
const paneContainer = require('../app/templates/clickPanes/paneContainer.html');

describe('directive unit testing', () => {
  let $httpBackend;
  let $scope;
  let $compile;
  beforeEach(() => {
    angular.mock.module('JobDash');
    angular.mock.inject(function(_$httpBackend_, $rootScope, _$compile_){
      $httpBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      $compile = _$compile_;
    });
  });
  it('should list and sort jobs, backlog job in second unordered list', () => {
    $httpBackend.expectGET('./templates/job/backlog.html')
    .respond(200, backLog);

    $scope.backlog = {
      jobs:[{
        title:'test',
        company:'testC'
      }, {
        title:'test2'
      }]
    };
    $scope.today = {
      jobs:[{
        title:'testA'
      }, {
        title:'testB'
      }, {
        title:'testC'
      }]
    };
    let element = angular.element('<div><backlog-view backlog="backlog.jobs" today="today.jobs"></backlog-view></div>');
    element.data('$ngControllerController', {});
    let link = $compile(element);
    let directive = link($scope);
    $scope.$digest();
    $httpBackend.flush();

    let list = (directive.find('li'));
    let BackLog = directive.find(('ul'))[1];
    let bList = angular.element(BackLog);
    let backLi = bList.find('li');
    let backLiTitle = (angular.element(directive.find('li')[3])).text();


    expect(backLi.length).toBe(2);
    expect(list.length).toBe(5);
    expect(backLiTitle).toContain('test');

  });

  it('should display count and title', () => {
    $httpBackend.expectGET('./templates/clickPanes/pane.html')
    .respond(200, pane);
    $scope.title = 'Today';
    $scope.todayCount = 5;

    let link = $compile('<pane title="title" count="todayCount"></pane>');
    let directive = link($scope);
    $scope.$digest();
    $httpBackend.flush();

    let count = directive.find('h4').text();
    let title = directive.find('div').text();

    console.log(title);

    expect(count).toBe('5');
    expect(title).toContain('Today');

  });
  it('should render four divs and display count accordingly', () => {
    $httpBackend.expectGET('./templates/clickPanes/paneContainer.html')
    .respond(200, paneContainer);
    $httpBackend.expectGET('./templates/clickPanes/pane.html')
    .respond(200, pane);
    $scope.backlog = {
      jobs:[{
        title:'test'
      },{
        tile:'test1'
      }]
    };
    $scope.today = {
      jobs:[{
        title: 'test2'
      }]
    };
    $scope.inProcess = {
      jobs:[{
        title:'test3'
      }]
    };
    $scope.applied = {
      jobs:[{
        title:'test11'
      }]
    };
    let element = angular.element('<div><pane-container backlog="backlog.jobs" today="today.jobs" inprocess="inProcess.jobs" applied="applied.jobs"></pane-container></div>');
    element.data('$ngControllerController', {});
    let link = $compile(element);
    let directive = link($scope);
    $scope.$digest();
    $httpBackend.flush();

    let numberOfDivs = angular.element(directive.find('pane'));
    let backlogDiv = (angular.element(directive.find('pane')[0])).text();

    expect(numberOfDivs.length).toBe(4);
    expect(backlogDiv).toContain('2');
  });
});
