"use strict";

BoardGameReview.controller("searchCtrl", [

  "$scope",
  "$location",
  "$http",
  "boardGameFactory",
  "reviewFactory",

  function ($scope, $location, $http, boardGameFactory, reviewFactory) {

    $scope.searchstring = "";
    $scope.foundGames = [];
    $scope.fakeReview = "Whoo i lovei it";
    $scope.editGameVisible = false;

    console.log("search controller");
    // this searches all the games
    $scope.searchGames = function () {
      // pulls all games from factory
      boardGameFactory.getGames()
      .then(function(boardGameCollection) {
        Object.keys(boardGameCollection).forEach(function (key) {
          boardGameCollection[key].id = key;
          boardGameCollection[key].review = "";
          // this makes sure you search regardless of case or length of searchstring 
          var string = boardGameCollection[key].name.toLowerCase();
          var patt = new RegExp($scope.searchstring.toLowerCase());
          var result = patt.test(string);
          if (result) {
            $scope.foundGames.push(boardGameCollection[key]);
          } 
          console.log("foundGames", $scope.foundGames);
          // resets the search back to empty
          $scope.searchstring = "";
        } );
        // pulls all the reviews from the review factory
        return reviewFactory.getReviews();
      
      }).then(function(reviewCollection) {
        console.log("reviewCollection", reviewCollection);
        // finds reviews for each game
        $scope.foundGames.forEach(function (game) {
          game.reviews = [];
          Object.keys(reviewCollection).forEach(function(key){
            let currentReview = reviewCollection[key];
            
            if(currentReview.gameID === game.id){
              game.reviews.push(currentReview.review);
            }
          }); 
          
        });

        console.log("$scope.foundGames",$scope.foundGames);


      },
      function () {

      });


    },
    // shows the editing form on the search.html
    $scope.showEditGame = function (game) { 
      console.log("game", game);
      return $scope.editGameVisible = true;

    },
    // pulls the editGame function from factory and re-hides the editing fields
    $scope.editGame = function(game) {
      boardGameFactory.editGame(game);
      return $scope.editGameVisible = false;
    },
    // pulls the delete function with "game" being passed to only delete one
    $scope.deleteGame = function (game) {
      console.log("search ctrl game", game );
      boardGameFactory.deleteGame(game);
    };
    // adds a review and saves the game id into the review firebase
    $scope.addReview = function (game) {
      console.log("review", game);
      reviewFactory.addReview(game.review, game.id).then (function (response) {
        console.log("response", response);
        game.review = '';
      });
    };


  }


  ]);
