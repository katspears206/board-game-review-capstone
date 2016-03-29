"use strict";

BoardGameReview.factory("userFactory", function ($q, $http) {
	return function () {
		return $q(function (resolve, reject) {
			return $http.get("https://board-game-review.firebaseio.com/Users/.json").success(function (userCollection) {
				return resolve(userCollection);
			}, function (error) {
				return reject(error);
			});
		});
	};
});