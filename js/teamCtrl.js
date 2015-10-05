fantool.controller('TeamCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.players = [ // $scope allows this array to be used on the template
		{ name: "Aaron Rodgers", team: "GB", position: "QB", salary: 10000, selected: false, slot: false },
		{ name: "Teddy Bridgewater", team: "MIN", position: "QB", salary: 8000, selected: false, slot: false },
		{ name: "Jay Cutler", team: "CHI", position: "QB", salary: 6000, selected: false, slot: false },
		{ name: "Eddie Lacy", team: "GB", position: "RB", salary: 9500, selected: false, slot: false },
		{ name: "Adrian Peterson", team: "MIN", position: "RB", salary: 10000, selected: false, slot: false },
		{ name: "Joique Bell", team: "DET", position: "RB", salary: 7500, selected: false, slot: false },
		{ name: "Matthew Stafford", team: "DET", position: "QB", salary: 9000, selected: false, slot: false },
		{ name: "Matt Forte", team: "CHI", position: "RB", salary: 8500, selected: false, slot: false },
		{ name: "Randall Cobb", team: "GB", position: "WR", salary: 9200, selected: false, slot: false },
		{ name: "Mike Wallace", team: "MIN", position: "WR", salary: 6400, selected: false, slot: false },
		{ name: "Calvin Johnson", team: "DET", position: "WR", salary: 9500, selected: false, slot: false },
		{ name: "Alshon Jeffery", team: "CHI", position: "WR", salary: 9000, selected: false, slot: false },
		{ name: "Martellus Bennett", team: "CHI", position: "TE", salary: 4000, selected: false, slot: false },
		{ name: "Kyle Rudolph", team: "MIN", position: "TE", salary: 4500, selected: false, slot: false },
		{ name: "Eric Ebron", team: "DET", position: "TE", salary: 4700, selected: false, slot: false },
		{ name: "Richard Rogers", team: "GB", position: "TE", salary: 4200, selected: false, slot: false },
	];

	$scope.team = [
		{position: "QB", player:{name:null}},
		{position: "RB", player:{}},
		{position: "RB", player:{}},
		{position: "WR", player:{}},
		{position: "WR", player:{}},
		{position: "WR", player:{}},
		{position: "TE", player:{}},
	];
	$scope.salary = 60000;
	$scope.positions = ["QB", "RB", "WR", "TE"];
	$scope.qbCount = 0;
	$scope.rbCount = 0;
	$scope.wrCount = 0;
	$scope.teCount = 0;

	$scope.filters = {};
	$scope.all = true;
	$scope.activated = false;

	$scope.clickPlayer = function(player){

		if(player.selected == false){
			positionCount(player);
			checkActivated();
		}
		else{
			removePlayer(player);
			$scope.activated = false;
		}
		//console.log($scope.team);
	};
	$scope.positionSort = function(position){
		$scope.all = false;
		$scope.filters.position = position;

	}
	$scope.clearPosition = function(){
		$scope.filters = {};
		$scope.all = true;
	}

	checkActivated = function(){
		for(x=0; x<$scope.team.length; x++){
			if($scope.team[x].player.name == null){
				break;
			}
			if(x == $scope.team.length-1 && $scope.salary >= 0){
				$scope.activated = true;
			}
		}
	}

	positionCount = function(player){
		console.log(player);
		errorMessage = "Your allotment for this position is already filled";
		switch(player.position){
			case "QB":
				if($scope.qbCount < 1){
					$scope.qbCount ++;
					player.slot = 0; 
					$scope.team[0].player = player;
					addPlayer(player);
				}
				else{
					alert(errorMessage);
				}
				break;
			case "RB":
				if($scope.rbCount < 2){
					$scope.rbCount ++;
					if(!$scope.team[1].player.name){
						player.slot = 1;
						$scope.team[1].player = player;
					} 
					else{
						player.slot = 2;
						$scope.team[2].player = player;
					}
					addPlayer(player);
				}
				else{
					alert(errorMessage);
				}
				break;
			case "WR":
				if($scope.wrCount < 3){
					$scope.wrCount ++;
					if(!$scope.team[3].player.name){
						player.slot = 3;
						$scope.team[3].player = player;
					} 
					else if(!$scope.team[4].player.name){
						player.slot = 4;
						$scope.team[4].player = player;
					} 
					else{
						player.slot = 5;
						$scope.team[5].player = player;
					}
					addPlayer(player);
				}
				else{
					alert(errorMessage);
				}
				break;
			case "TE":
				if($scope.teCount < 1){
					$scope.teCount ++;
					player.slot = 6;
					$scope.team[6].player = player;
					addPlayer(player);
				}
				else{
					alert(errorMessage);
				}
				break;
		}
	}

	addPlayer = function(player){
		$scope.salary -= player.salary;
		player.selected = true;
	}

	removePlayer = function(player){
		$scope.salary += player.salary;
		player.selected = false;
		
		switch(player.position){
			case "QB":
				$scope.qbCount --;
				$scope.team[0].player = {}; 
				break;
			case "RB":
				$scope.rbCount --;
				if(player.slot == 1) $scope.team[1].player = {}; 
				else $scope.team[2].player = {}; 
				break;
			case "WR":
				$scope.wrCount --;
				if(player.slot == 3) $scope.team[3].player = {}; 
				else if(player.slot == 4) $scope.team[4].player = {};
				else $scope.team[5].player = {}; 
				break;
			case "TE":
				$scope.teCount --;
				$scope.team[6].player = {}; 
				break;
		}
		player.slot = false;
	}




	// $scope.clearCompleted = function(){
	// 	$scope.todos = $scope.todos.filter(function(el, index){
	// 		return !el.completed;
	// 	});
	// };


	//API GET REQUEST WITH ANGULAR EXAMPLE
	// var onUserComplete = function(response){
	// 	$scope.user = response.data;
	// }
	// var onError = function(reason){
	// 	$scope.error = "Could not fetch the user.";
	// }
	// $http.get("https://api.github.com/users/HerddADVance")
	// 		 .then(onUserComplete, onError);

}]);