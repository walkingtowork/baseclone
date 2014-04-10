function homeController($scope, $http) {
    $scope.projectName = '';
    $scope.projectDescription = '';

    // '/proxy' is the Django url we have set up. '/projects.json' is the actual route on the Basecamp API that
    // we want to hit. The root basecamp url we are hitting is passed in urls.py to the Django view.
//    $http.get('/proxy/projects.json').
//        success(function(data){
//            $scope.projects = data;
//        }).error(function(data) {
//          console.log("didn't work");
//    });

    $scope.newProject = function(){
        $http.post('/proxy/projects.json', {"name": $scope.projectName, "description": $scope.projectDescription}).
            success(function(response){
                console.log(response);
                $scope.projects.unshift(response);
            }).error(function(response) {
              console.log("didn't work");
        });
    }
}