"use strict";

BoardGameReview.factory("boardGameFactory", function ($q, $http) {

	return {

		getGames () {
			return $q(function (resolve, reject) {
				return $http.get("https://board-game-review.firebaseio.com/Boardgames/.json").success(function (boardGameCollection) {
					console.log("boardGameCollection", boardGameCollection);
							return resolve(boardGameCollection);
						}, function (error) {
							return reject(error);
						});
			});
		},

		deleteGame (game) {
			$http.delete(`https://board-game-review.firebaseio.com/Boardgames/${game.id}.json`)
					.then(function () {
        	$location.url("/")
        });
		},

		editGame (game) {
			console.log("game", game);
			$http.put(`https://board-game-review.firebaseio.com/Boardgames/${game.id}.json`)

				 JSON.stringify({
          name: $scope.game.name,
          description: $scope.game.description,
          players: $scope.game.players,
          image: $scope.game.image
        })
		}

	}

});