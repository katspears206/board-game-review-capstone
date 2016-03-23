"use strict";

BoardGameReview.factory("reviewFactory", function ($q, $http) {
	return function () {
		return $q(function (resolve, reject) {
			return $http.get("https://board-game-review.firebaseio.com/reviews").success(function (reviewCollection) {
				return resolve(reviewCollection);
			}, function (error) {
				return reject(error);
			});
		});
	};
});