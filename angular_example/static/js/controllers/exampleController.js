function exampleController($scope, $http) {
    $scope.stuff = "I have a default value";

    $http({method: 'GET', url: 'http://api.icndb.com/jokes/random?firstName=Rudy&lastName=Mutter'}).
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
            $scope.chuckNorris = data.value.joke;
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
            $scope.chuckNorris = "Rudy Mutter never fails";
    });

}