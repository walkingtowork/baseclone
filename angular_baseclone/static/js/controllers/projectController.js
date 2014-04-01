function projectController($scope, $http, $routeParams) {
    // Here we'll use $routeParams to get the id from the URL and then append it
    // to our $http.get URL
    var projectId = $routeParams.id;

    $http.get('/proxy/projects/' + projectId + '.json').
        success(function(data){
            $scope.project = data;
        }).error(function(data) {
          console.log("didn't work");
    });

}