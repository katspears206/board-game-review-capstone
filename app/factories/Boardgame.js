"use strict";

BoardGameReview.factory("boardGameFactory", function ($q, $http) {
	return function () {
		return $q(function (resolve, reject) {
			return $http.get("https://board-game-review.firebaseio.com/boardgames").success(function (boardGameCollection) {
				return resolve(boardGameCollection);
			}, function (error) {
				return reject(error);
			});
		});
	};
});