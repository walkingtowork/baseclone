function HomeController($scope, $http) {
    console.log('Hello');

    $http.get('/proxy/projects.json').
        success(function(data){
        console.log("Worked");
        console.log(data);
        }).error(function(data) {
          console.log("didn't work");
          console.log(data);
        });
}