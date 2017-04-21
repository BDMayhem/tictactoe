$(document).ready(function(){
  reset();
})

var winConditions = [
  [1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 1],
  [1, 0, 0, 1, 0, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 1],
  [0, 0, 1, 0, 1, 0, 1, 0, 0]
];
var xboard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var oboard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var whoseTurn = "X";
var game = true;
var sneakyPlays = [
  [1, 0, 0, 0, 0, 0, 0, 1, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 1, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 1, 0],

];
var hash = {};
for (var g = 0; g < sneakyPlays.length; g++){
  hash[sneakyPlays[g]] = g;
}

function reset(){
  xboard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  oboard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  whoseTurn = "X";
  game = true;
  $(".newGame").html("");
  $(".newGame").addClass("hidden");
  $(".board").addClass("hidden");
  $("#howMany").removeClass("hidden");
  $(".squares").html(" ");
  $(".squares").removeClass("marked");
  $("#pone").click(function(){
    $("#howMany").addClass("hidden");
    $(".board").removeClass("hidden");
    onePlayer();
  })
  $("#ptwo").click(function(){
    $("#howMany").addClass("hidden");
    $(".board").removeClass("hidden");
    twoPlayer();
  })
}

function checkWin(myBoard){
  winConditions.forEach(function(e){
    var count = 0;
    for (var i = 0; i < e.length; i++){
      if (e[i] === myBoard[i] && e[i] === 1){
        count++;
        if (count === 3){
          game = false;
          $(".newGame").removeClass("hidden");
          $(".newGame").prepend("<p>" + whoseTurn + " won!</p><p>Click here to play again.</p>");
          $(".newGame").click(function(){
            reset();
          })
        }
      }
    }
  })
  var draw = myBoard.reduce(function(a, b){
    return a+b;
  })
  if (game === true && draw === 5){
    game = false;
    $(".newGame").removeClass("hidden");
    $(".newGame").prepend("<p>Draw!</p><p>Click here to play again.</p>");
    $(".newGame").click(function(){
      reset();
    })
  }
}

function onePlayer(){
  if (whoseTurn === "X"){
    $(".squares").click(function(event){
      var myClasses = this.className.split(" ");
      var taken = false;
      if (myClasses.indexOf("marked") >= 0){
        taken = true;
      }
      if (taken !== true && game === true){
        $(this).html(whoseTurn);
        var marker = event.target.id-1;
        $(this).addClass("marked");
        xboard.splice(marker, 1, 1);
        checkWin(xboard);
        whoseTurn = "O";
        initialMoves();
      }
    })
  }
}

function initialMoves(){
  if (whoseTurn === "O" && game === true){
    if ($("#5").text() !== "X" && $("#5").text() !== "O"){
      $("#5").html(whoseTurn);
      $("#5").addClass("marked");
      oboard.splice(4, 1, 1);
      console.log(oboard);
      checkWin(oboard);
      whoseTurn = "X";
    } else if (hash.hasOwnProperty(xboard)){
      if ($("#1").text() === "X"){
        $("#4").html(whoseTurn);
        $("#4").addClass("marked");
        oboard.splice(3, 1, 1);
        checkWin(oboard);
        whoseTurn = "X";
      } else if ($("#3").text() === "X"){
        $("#6").html(whoseTurn);
        $("#6").addClass("marked");
        oboard.splice(5, 1, 1);
        checkWin(oboard);
        whoseTurn = "X";
      } else if ($("#8").text() === "X"){
        $("#9").html(whoseTurn);
        $("#9").addClass("marked");
        oboard.splice(8, 1, 1);
        checkWin(oboard);
        whoseTurn = "X";
      } else if ($("#6").text() === "X"){
        $("#2").html(whoseTurn);
        $("#2").addClass("marked");
        oboard.splice(1, 1, 1);
        checkWin(oboard);
        whoseTurn = "X";
      }
    } else if ($("#5").text() === "X" && $("#1").text() !== "O"){
      $("#1").html(whoseTurn);
      $("#1").addClass("marked");
      oboard.splice(0, 1, 1);
      console.log(oboard);
      checkWin(oboard);
      whoseTurn = "X";
    } else {
      canIWin();
    }
  }
}

function canIWin(){
  if (game === true && whoseTurn === "O"){
    var foundTwo = false;
    var finished = false;
    winConditions.forEach(function(e){
      var count = 0;
      for (var i = 0; i < e.length; i++){
        if (e[i] === oboard[i] && e[i] === 1){
          count++;
        }
      }
      if (count === 2){
        foundTwo = true;
        var missing = [];
        for (var j = 0; j < e.length; j++){
          missing.push(e[j] - oboard[j]);
        }
        var winner = missing.indexOf(1) + 1;
        var myClasses = document.getElementById(winner).className;
        var taken = false;
        if (myClasses.indexOf("marked") >= 0){
          taken = true;
        }
        if (taken === true && finished === false){
          foundTwo = false;
          return whoseTurn;
        } else if (taken !== true){
          $("#" + winner).html(whoseTurn);
          $("#" + winner).addClass("marked");
          oboard.splice(winner - 1, 1, 1);
          finished = true;
          checkWin(oboard);
        }
      }
    })
    canIBlock();
  }
}

function canIBlock(){
  if (game === true && whoseTurn === "O"){
    var foundTwo = false;
    var finished = false;
    winConditions.forEach(function(e){
      var count = 0;
      for (var i = 0; i < e.length; i++){
        if (e[i] === xboard[i] && e[i] === 1){
          count++;
        }
      }
      if (count === 2){
        var missing = [];
        for (var j = 0; j < e.length; j++){
          missing.push(e[j] - xboard[j]);
        }
        var block = missing.indexOf(1) + 1;
        var myClasses = document.getElementById(block).className;
        var taken = false;
        if (myClasses.indexOf("marked") >= 0){
          taken = true;
        }
        if (taken === true){
          return whoseTurn;
        } else if (taken !== true && finished === false){
          $("#" + block).html(whoseTurn);
          $("#" + block).addClass("marked");
          oboard.splice(block - 1, 1, 1);
          console.log(oboard)
          whoseTurn = "X";
          foundTwo = true;
          finished = true;
          return whoseTurn;
        }
      } 
    })
    if (foundTwo === false){
      var corners = [];
      $(".corner:not(.marked)").each(function(){
        var cornerID = this.id;
        corners.push(cornerID);
      });
      var open = corners[0];
      console.log(open)
      var myClasses = document.getElementById(open).className;
      var taken = false;
      if (myClasses.indexOf("marked") >= 0){
        taken = true;
      }
      if (taken !== true){
        $("#" + open).html(whoseTurn);
        $("#" + open).addClass("marked");
        oboard.splice(open - 1, 1, 1);
        checkWin(oboard);
        whoseTurn = "X";
        return whoseTurn;
      }
    }
  }
}

function twoPlayer(){
  $(".squares").click(function(event){
    var myClasses = this.className.split(" ");
    var taken = false;
    if (myClasses.indexOf("marked") >= 0){
      taken = true;
    }
    if (game === true && taken !== true){
      $(this).html(whoseTurn);
      var marker = event.target.id-1;
      if (whoseTurn === "X"){
        $(this).addClass("marked");
        xboard.splice(marker, 1, 1);
        checkWin(xboard);
        whoseTurn = "O";
      } else {
        $(this).addClass("marked");
        oboard.splice(marker, 1, 1);
        checkWin(oboard);
        whoseTurn = "X";
      }
    }
  })
}