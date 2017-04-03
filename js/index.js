model = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];

var emptyDice = [0, 0];

var score = 0;

function isSolved() {

  var solved = false;

  var stringModel = "" + model;
  var solveArray = [
    "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0",
    "0,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1",
    "1,5,9,13,2,6,10,14,3,7,11,15,4,8,12,0",
    "0,12,8,4,15,11,7,3,14,10,6,2,13,9,5,1"
  ];

  for (var i = 0; i < solveArray.length; i++) {
    if (stringModel == solveArray[i]) {
      solved = true;
    }
  }

  return solved;
  
}

function resetModel() {

  model = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];

  emptyDice = [0, 0];

  score = 0;
}

function open_menu() {
  $("#game").addClass("hiden");
}

function new_game() {

  setModel();
  renderModel();

  $("#game").removeClass("hiden");
  $("#message").addClass("unvisible");
}

function setModel() {

  resetModel();

  var pre = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  for (var rowI = 0; rowI < 4; rowI++) {
    for (var colI = 0; colI < 4; colI++) {
      if (pre.length > 0) {
        var preIndex = Math.floor(Math.random() * (pre.length - 1));
        model[rowI][colI] = pre.splice(preIndex, 1)[0];
      }
    }
  }
}

function renderModel() {

  var diceIndex = 0;

  for (var rowI = 0; rowI < 4; rowI++) {
    for (var colI = 0; colI < 4; colI++) {
      diceIndex++;
      renderDice("#dice_" + diceIndex, model[rowI][colI], {
        row: rowI,
        col: colI
      });
    }
  }

  $("#score").html(score);

  var soSolved = isSolved();
  if(soSolved===true){
    $("#message").empty();
    $("#message").html("Well done! You solve puzzle for" +score + " moves!");
    $("#message").removeClass("unvisible");
    open_menu();
  }
}

function renderDice(selector, value, addInfo) {

  var element = $(selector);
  if (value === 0) {
    element.addClass("empty");
    element.children(".label").empty();
    emptyDice = [addInfo.row, addInfo.col];
  } else {
    element.removeClass("empty");
    element.children(".label").html(value);
  }

  element.attr("row", addInfo.row);
  element.attr("col", addInfo.col);
  element.attr("value", value);

}

function checkMove(row, col) {
  var isCorrect = false;

  if (
    ((row+1===emptyDice[0] || row-1===emptyDice[0]) & col===emptyDice[1])
      ||
      ((col+1===emptyDice[1] || col-1===emptyDice[1])&row===emptyDice[0])
    )
  {
    isCorrect = true;
  }

  return isCorrect;
}

function updateModel(value, row, col) {

  var isCorrect = checkMove(row, col);
  if (isCorrect === true) {
    model[row][col] = 0;
    model[emptyDice[0]][emptyDice[1]] = value;
    emptyDice = [row, col];
    score += 1;
  }

}

$(".button, .header-line-button.text-left").on("click", function() {
  new_game();
});
$("#button_OpenMenu").click(function() {
  open_menu();
});
$("div .dice").on("click", function(event) {

  var diceObj = $(this);

  var target_selector = $(diceObj).attr("id");
  var target_value = Number($(diceObj).attr("value"));
  var target_addInfo_row = Number($(diceObj).attr("row"));
  var target_addInfo_col = Number($(diceObj).attr("col"));

  updateModel(target_value, target_addInfo_row, target_addInfo_col);

  renderModel();

});