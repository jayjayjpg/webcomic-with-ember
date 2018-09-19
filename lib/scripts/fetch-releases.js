// usage: node fetch-releases.js

const fetchAllPages = require('./fetch-pages');

const projects = [
  { name: 'ember', url: 'emberjs/ember.js' },
  { name: 'angular', url: 'angular/angular' },
  { name: 'angularjs', url: 'angular/angular.js' },
  { name: 'react', url: 'facebook/react' },
  { name: 'vue', url: 'vuejs/vue' },
  { name: 'aurelia', url: 'aurelia/framework' },
  { name: 'backbone', url: '/jashkenas/backbone' },
];

projects.forEach(project => fetchAllPages(`${project.name}-releases`, `https://api.github.com/repos/${project.url}/tags`));
