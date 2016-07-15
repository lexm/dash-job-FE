'use strict';
module.exports = function (app) {
  let url = process.env.URI;
  app.controller('JobController', function ($http, AuthService, sortJobs, globals) {
    this.$http = $http;
    this.jobs = [];
    this.events = [];
    this.today = []; //from active and isToay = true
    this.backlog = []; //from active and value > 0
    this.inprocess = []; //from active and value > 2
    this.applied = []; //from active and value = 1
    this.showjobevents = false;
    this.showbacklog = true;
    this.jobCard = {};
    this.mode = 'list';
    this.linkApiJob = {};
    this.joblist = [];

    this.getLink = function (link) {

      $http({
        method: 'POST',
        data: link,
        url: url + 'link',
        headers: {
          token: AuthService.getToken()
        }
      })
        .then((res) => {
          this.linkApiJob = res.data;
        }, (err) => {
          console.log(err);
        });
    }.bind(this);


    this.getActiveJobs = function () {
      $http({
        method: 'GET',
        url: url + 'jobs/active',
        headers: {
          token: AuthService.getToken()
        }
      })
        .then((res) => {
          this.jobs = res.data;
          this.today = sortJobs.getToday(this.jobs);
          this.backlog = sortJobs.getBackLog(this.jobs);
          this.applied = sortJobs.applied(this.jobs);
          this.inprocess = sortJobs.inprocess(this.jobs);
        })
        .then(() => {
          $http({
            method: 'GET',
            url: url + 'events/active',
            headers: {
              token: AuthService.getToken()
            }
          })
            .then((res) => {
              this.events = res.data;
              this.today = sortJobs.attachEvents(this.today, this.events);
              this.backlog = sortJobs.attachEvents(this.backlog, this.events);
              this.inprocess = sortJobs.attachEvents(this.inprocess, this.events);
              this.applied = sortJobs.attachEvents(this.applied, this.events);


            }, (err) => {
              console.log(err);
            });
        });
    };

    this.addJobs = function (job) {
      $http({
        method: 'POST',
        data: job,
        url: url + 'jobs',
        headers: {
          token: AuthService.getToken()
        }
      })
        .then((res) => {
          this.backlog.push(res.data);
        }, (err) => {
          console.log(err);
        });
    }.bind(this);

    this.addEvent = function (events) {
      $http({
        method: 'POST',
        data: events,
        url: url + 'events',
        headers: {
          token: AuthService.getToken()
        }
      })
        .then((res) => {
          if (!this.jobCard.job.events) this.jobCard.job.events = [];
          this.jobCard.job.events.push(res.data);
        }, (err) => {
          console.log(err);
        });
    }.bind(this);

    this.deleteJobs = function (job) {
      $http({
        method: 'DELETE',
        data: job,
        url: url + 'jobs/' + job._id,
        headers: {
          token: AuthService.getToken()
        }
      })
      .then(() => {
        let index = this.jobs.indexOf(job);
        this.jobs.splice(index, 1);
      }, (err) => {
        console.log(err);
      });
    }.bind(this);

    this.updateJobs = function (job) {
      $http({
        method: 'PUT',
        data: job,
        url: url + 'jobs/' + job._id,
        headers: {
          token: AuthService.getToken()
        }
      })
      .then(() => {
        this.jobs = this.jobs.map(nJob => {
          return nJob._id === job._id ? job : nJob;
        });
      }, (err) => {
        console.log(err);
      });
    }.bind(this);

    this.jobClick = function(job){
      this.jobCard.job = job;
      this.mode = 'single';
    }.bind(this);
  });
};
