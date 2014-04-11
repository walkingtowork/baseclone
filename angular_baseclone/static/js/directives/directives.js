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
        templateUrl: "/static/js/views/directives/searchbar.html",
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
        templateUrl: "/static/js/views/directives/factoid.html",
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