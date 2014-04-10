var baseclone = angular.module('baseclone',['ngRoute', 'ngResource', 'ngSanitize', 'ui.bootstrap']);


// This is where we set our routes
baseclone.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/', {templateUrl: '/static/js/views/home.html', controller: homeController}).
        // Add a specific project id as a route parameter here
        when('/projects/:id', {templateUrl: '/static/js/views/project.html', controller: projectController}).
        when('/projects/:projectId/discussion/:discussionId', {templateUrl: '/static/js/views/discussion.html', controller: discussionController}).
        otherwise({redirectTo: '/'});
}]);

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

baseclone.directive('button', function(){
    return {
        restrict: 'E',
        compile: function(element, attributes){
            element.addClass('btn');
            if (attributes.type === "submit") {
                element.addClass('btn-primary');
            }
            if (attributes.size) {
                element.addClass('btn-' + attributes.size);
            }
        }
    }
});

baseclone.directive('welcome', function(){
    return {
        restrict: 'E',
        template: "<div>Welcome to Baseclone!</div>"
    }
});

baseclone.directive('searchBar', function(){
// If you are using template or templateUrl in your directive with replace: true,
// you must have a single root element that is replacing the directive call in your
// view. So, you can't have two <p> tags as siblings here without a wrapper. You need a
// SINGLE element (in this case <div>) for Angular to inject
    return {
        restrict: 'E',
        templateUrl: "/static/js/views/searchbar.html",
        replace: "true",
        link: function(scope){
            var query = location.hash.split("?")[1];
            if (query) {
                scope.searchText = query;
            }
        }
    }
});

baseclone.directive('factoids', function($rootScope){
    return {
        restrict: 'A',
        templateUrl: "/static/js/views/factoid.html",
        link: function(scope, element, attrs){
            var factoids = [
                'Basecamp used to be called 37signals',
                'David Heienemeier-Hansson (dhh) created Rails while building Basecamp',
                'Basecamp is based in Chicago but they are obsessed with working remotely',
                'Highrise is another Basecamp product',
                'Put anything you want here',
            ]
            $rootScope.$on('$routeChangeSuccess', function(){
                scope.factoid = factoids[Math.floor((Math.random()*5))];
            });
        }
    }
});