var baseclone = angular.module('baseclone',['ngRoute', 'ngResource']);

baseclone.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {templateUrl: '/static/js/views/home.html', controller: homeController}).
        // Add a specific project id as a route parameter here
        when('/projects/:id', {templateUrl: '/static/js/views/project.html', controller: projectController}).
        otherwise({redirectTo: '/'});
}]);


// If you need to add headers to an Angular request, it would look like this (this is the same as the
// Django proxy view where we added headers to the request):
//
//baseclone.run(function($http) {
//   $http.defaults.headers.common.Authorization = 'Basic YWxleCsxQHlldGlocS5jb206cGFzc3cwcmQ1';
//   $http.defaults.headers.common.UserAgent = 'alex+1@yetihq.com (alex+1@yetihq.com)';
//   $http.defaults.headers.common.ContentType = 'application/json';
//});