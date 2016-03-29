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

    $scope.searchGames = function () {

      boardGameFactory.getGames()
      .then(function(boardGameCollection) {
        Object.keys(boardGameCollection).forEach(function (key) {
          var string = boardGameCollection[key].name.toLowerCase();
          boardGameCollection[key].id = key;
          boardGameCollection[key].review = "";
          var patt = new RegExp($scope.searchstring.toLowerCase());
          var result = patt.test(string);
          if (result) {
            $scope.foundGames.push(boardGameCollection[key]);
          } 
          console.log("foundGames", $scope.foundGames);
          $scope.searchstring = ""
        } )

        return reviewFactory.getReviews();
      
      }).then(function(reviewCollection) {
        console.log("reviewCollection", reviewCollection);

        $scope.foundGames.forEach(function (game) {
          game.reviews = [];
          Object.keys(reviewCollection).forEach(function(key){
            let currentReview = reviewCollection[key];
            
            if(currentReview.gameID === game.id){
              game.reviews.push(currentReview.review)
            }
          }); 
          
        });

        console.log("$scope.foundGames",$scope.foundGames);


      },
      function () {

      });


    },

    $scope.showEditGame = function (game) { 
      console.log("game", game);
      return $scope.editGameVisible = true;

    },

    $scope.editGame = function(game) {
      boardGameFactory.editGame(game);
      return $scope.editGameVisible = false;
    },

    $scope.deleteGame = function (game) {
      console.log("search ctrl game", game );
      boardGameFactory.deleteGame(game);
    }

    $scope.addReview = function (game) {
      console.log("review", game);
      reviewFactory.addReview(game.review, game.id).then (function (response) {
        console.log("response", response);
      })
    }


  }


  ]);
