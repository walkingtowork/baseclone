function exampleController($scope, $http) {
    $scope.stuff = "I have a default value";

    $scope.firstName = "Rudy";
    $scope.lastName = "Mutter";

    $scope.chuckNorrisMe = function(){
        $http({method: 'GET',
            url: 'http://api.icndb.com/jokes/random?firstName=' + $scope.firstName + '&lastName=' + $scope.lastName}).
            success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.chuckNorris = data.value.joke;
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $scope.chuckNorris = $scope.firstName + $scope.lastName + " never fails";
            });
    }

    $scope.chuckNorrisMe();

}