var baseclone = angular.module('baseclone',['ngRoute', 'ngResource', 'ngSanitize', 'ui.bootstrap']);


// This is where we set our routes
baseclone.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {templateUrl: '/static/js/views/home.html', controller: homeController}).
        // Add a specific project id as a route parameter here
        when('/projects/:id', {templateUrl: '/static/js/views/project.html', controller: projectController}).
        when('/projects/:projectId/discussion/:discussionId', {templateUrl: '/static/js/views/discussion.html', controller: discussionController}).
        when('/projects/:projectId/todo/:todoId', {templateUrl: '/static/js/views/todo.html', controller: todoController}).
        when('/projects/:projectId/todolist/:todoListId', {templateUrl: '/static/js/views/todo_list.html', controller: todoListController}).
        when('/projects/:projectId/calendar_event/:calendarId', {templateUrl: '/static/js/views/calendar_event.html', controller: calendarEventController}).
        otherwise({redirectTo: '/'});
}]);

baseclone.run(function($rootScope, $http){
    $http.get('/proxy/projects.json').
        success(function(data){
            $rootScope.projects = data;
        }).error(function(data) {
          console.log("didn't work");
    });
});

// This code creates a custom filter that is used in project.html
baseclone.filter('topicTypeFilter', function() {
   return function(topicList, topicType) {
       // Unlike our previous filter, which was a function in the projectController that used
       // Angular's built-in filtering, custom app filters are applied to the whole list of objects
       // e.g. in projectController.hasAttachment(filterData), filterData is a specific topic
       // In baseclone.topicTypeFilter, topicList is the list of all topics,
       // and we have to iterate over each ourselves
       var filtered = [];
       angular.forEach(topicList, function(topic){
           if (topic.topicable.type == topicType) {
               filtered.push(topic);
           }
       });
       return filtered;
   };
});

// If you need to add headers to an Angular request, it would look like this (this is the same as the
// Django proxy view where we added headers to the request):
//
//baseclone.run(function($http) {
//   $http.defaults.headers.common.Authorization = 'Basic YWxleCsxQHlldGlocS5jb206cGFzc3cwcmQ1';
//   $http.defaults.headers.common.UserAgent = 'alex+1@yetihq.com (alex+1@yetihq.com)';
//   $http.defaults.headers.common.ContentType = 'application/json';
//});