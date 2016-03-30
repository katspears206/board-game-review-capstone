"use strict";

BoardGameReview.factory("reviewFactory", function ($q, $http, authFactory, boardGameFactory) {

	let user = authFactory.getUser();

	return {
		getReviews () {
			return $q(function (resolve, reject) {
				return $http.get("https://board-game-review.firebaseio.com/Reviews/.json").success(function (reviewCollection) {
					return resolve(reviewCollection);
				}, function (error) {
					return reject(error);
				});
			});
		},

		addReview (review, id) {
			console.log("review", review);
      // POST the review to Firebase
      return $q(function (resolve, reject) {
				return $http.post("https://board-game-review.firebaseio.com/Reviews.json",

        // Remember to stringify objects/arrays before
        // sending them to an API
	        JSON.stringify({
	          review : review,
	          userID: user.uid,
	          gameID: id
	        })
	    	).success (
	    	function (response) {
	    		resolve(response);
	    	});
			});
    },

		deleteReview (review) {
			$http.delete(`https://board-game-review.firebaseio.com/Reviews/${review.id}.json`)
				.then(function ( ){
					console.log("what is wrong?", review.id);
				});
		}

	}
});