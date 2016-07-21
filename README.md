

# DashJobs

https://dashjobs.herokuapp.com/

## A MEAN stack application to help organize your job seach.
___

 Users interact with a dashboard to organize the different jobs they have applied, or are wanting to apply to. In order to access and save their data, a user must create an account.



## Creating a User Account and Signing In
To create an account, a user needs to create a username and password. If the username is already in use, the user will have to choose a different one, or sign in with that username. To sign in, the user needs to input their username and password on the sign in page. If sign up or sign in is successful, the user will be taken to their dashboard.

## Features
In its nascent stage, a user can:

* add a job to their dashboard. By pasting in a job link from Indeed, the job form will automatically be filled with the relevant information. If the user does not have a link, they can click the plus button which allow them to manually fill out the form.

* move jobs from the Backlog list to the Today list utilizing the drag and drop functionality from Angular Materials.

* click on a specific job, and see details and events (like phone interviews) pertaining to that job.

* add events to a job.

In future updates, a user will also be able to:

* paste urls into the add form that are compatible with more job sites

* see a graph that shows their productivity vs. responses

* set reminders for events. For instance, the user can be notified when to send a follow-up email.

---
## Installing the App Locally

First fork from the repo, and then type in the command line:
```
git clone https://github.com/DashJob/dash-job-FE.git
```
This is only the front end to the app. To clone down the backend: open a new terminal window, fork from the [backend repo](https://github.com/DashJob/dash-job-api), and then type in the command line:
```
git clone https://github.com/DashJob/dash-job-api.git
```
Be sure to install the dependencies for both the front and backend by typing in the command line for each terminal window:
```
npm install
```
Run MongoDB by adding a folder named db to the _backend_ repo project folder. Then type in the command line in your terminal window pertaining to the backend:
```
mongod --dbpath db
```
Leave this window open.

Build the front end by typing in the terminal window pertaining to the front end:
```
gulp
```

To start the app, in each terminal window, type in the command line
```
node server.js
```
Leave both these windows open.

You can open the app through the browser by going to [http://localhost:3003](http://localhost:3003/)

___
## Dependencies
"angular": "^1.5.7",

"angular-route": "^1.5.7",

"express": "^4.14.0",

"webpack": "^1.13.1"

## DevDependencies
"angular-drag-and-drop-lists": "^1.4.0",

"angular-mocks": "^1.5.7",

"eslint": "^2.11.1",

"gulp": "3.9.1",

"gulp-eslint": "^2.0.0",

"gulp-header": "1.8.2",

"gulp-notify": "^2.2.0",

"gulp-plumber": "^1.1.0",

"html-loader": "^0.4.3",

"jasmine": "^2.4.1",

"jasmine-core": "^2.4.1",

"karma": "^0.13.22",

"karma-chrome-launcher": "^1.0.1",

"karma-firefox-launcher": "^1.0.0",

"karma-growl-reporter": "^1.0.0",

"karma-jasmine": "^1.0.2",

"karma-mocha-reporter": "^2.0.0",

"webpack-stream": "^3.2.0"
___
## Authors
A CodeFellows project written by [Dustin McBride](https://github.com/dmcfly85), [Maddie Mow](https://github.com/jdar22169), and [Stephen Schroder](https://github.com/schrode50).

## License

This project is licensed under the terms of the MIT license.
