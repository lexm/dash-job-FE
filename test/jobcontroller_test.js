'use strict';

const angular = require('angular');
require('angular-mocks');
require('../app/js/client.js');

describe('JobController Testing', () => {
  let jobctrl;
  let $httpBackend;

  beforeEach(() => {
    angular.mock.module('JobDash');
    angular.mock.inject(function($controller, _$httpBackend_){
      jobctrl = new $controller('JobController');
      $httpBackend = _$httpBackend_;
    });
  });

  afterEach(() => {
    $httpBackend.verifyNoOutstandingRequest();
    $httpBackend.verifyNoOutstandingExpectation();
  });

  it('should get a list of jobs and events', () => {
    let testJob = {_id:'1', title:'test', isToday:true};
    $httpBackend.expectGET('http://localhost:3000/jobs/active')
    .respond(200,[testJob]);
    $httpBackend.expectGET('http://localhost:3000/events/active')
    .respond(200, [{jobId:'1', note:'testEvent'}]);
    jobctrl.getActiveJobs();
    $httpBackend.flush();
    expect(jobctrl.jobs[0].title).toBe('test');
    expect(jobctrl.events[0].note).toBe('testEvent');
  });

  it('should attach to linkApiJob object', () => {
    $httpBackend.expectPOST('http://localhost:3000/link')
    .respond(200, {title:'testing', company:'123', url: 'www.test.com'});
    jobctrl.getLink();
    $httpBackend.flush();
    expect(jobctrl.linkApiJob.title).toBe('testing');
    expect(jobctrl.linkApiJob.url).toBe('www.test.com');
  });

  it('should change mode on click', () => {
    jobctrl.jobClick({title:'test click'});

    expect(jobctrl.mode).toBe('single');
    expect(jobctrl.jobCard.job.title).toBe('test click');
  });

  it('should add a job to the backlog', () => {
    $httpBackend.expectPOST('http://localhost:3000/jobs')
    .respond(200, {title:'testing', company:'123'});
    jobctrl.addJobs();
    $httpBackend.flush();
    expect(jobctrl.backlog[0].title).toBe('testing');
  });

  it('should update a job', () => {
    let testJob = {title:'testing', _id:1};
    let updatedJob = {_id:1, title:'frog'};
    jobctrl.jobs.push(testJob);
    $httpBackend.expectPUT('http://localhost:3000/jobs/' + 1)
    .respond(200);
    jobctrl.updateJobs(updatedJob);
    $httpBackend.flush();

    expect(jobctrl.jobs[0].title).toBe('frog');
    expect(jobctrl.jobs.length).toBe(1);
  });

  it('should delete a job', () => {
    let testJob = {title:'test delete', _id:1};
    $httpBackend.expectDELETE('http://localhost:3000/jobs/' + 1)
    .respond(200);
    jobctrl.jobs.push(testJob);
    jobctrl.deleteJobs(testJob);
    $httpBackend.flush();

    expect(jobctrl.jobs.length).toBe(0);
  });

  it('should add an event with the same jobId as job _id', () => {
    $httpBackend.expectPOST('http://localhost:3000/events')
    .respond(200, {jobId: '1', note:'testing'});
    jobctrl.jobCard.job = {_id:'1', title:'testing'};
    jobctrl.addEvent();
    $httpBackend.flush();

    expect(jobctrl.jobCard.job.events[0].note).toBe('testing');
  });

});
