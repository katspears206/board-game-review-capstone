"use strict";

BoardGameReview.controller("createGameCtrl",
[
  "$scope",
  "$location",
  "$http",

  function ($scope, $location, $http) {
    console.log("create Game control present");
    // Default property values for keys bound to input fields
    $scope.game = {
      name: "",
      description: "",
      players: "",
      image: ""
    };

    // Function bound to the Add Song button in the view template
    $scope.addGame = function () {

      // POST the song to Firebase
      $http.post(
        "https://board-game-review.firebaseio.com/Boardgames.json",

        // Remember to stringify objects/arrays before
        // sending them to an API
        JSON.stringify({
          name: $scope.game.name,
          description: $scope.game.description,
          players: $scope.game.players,
          image: $scope.game.image
        })

      // The $http.post() method returns a promise, so you can use then()
      ).then(
        function () { 
        $location.url("/search/")
        },      // Handle resolve
        function (response) {
          console.log(response)
        }  // Handle reject
      );
    };
  }
]);