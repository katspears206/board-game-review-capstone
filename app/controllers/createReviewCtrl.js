"use strict";

BoardGameReview.controller("createReviewCtrl",
[
  "$scope",
  "$location",
  "$http",

  function ($scope, $location, $http) {

    // Default property values for keys bound to input fields
    $scope.newGame = {
      id: "",
      review: ""
    };

    // Function bound to the Add Song button in the view template
    $scope.addGame = function () {

      // POST the song to Firebase
      $http.post(
        "https://board-game-review.firebaseio.com/Reviews.json",

        // Remember to stringify objects/arrays before
        // sending them to an API
        JSON.stringify({
          id: $scope.newGame.id,
          review: $scope.newGame.review
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