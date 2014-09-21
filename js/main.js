var myField = {
    name: "myField",
    myCells: [],
    size : 0
};
var playerField = {
    name: "Player2",
    myCells: [],
    size: 0
};

var getAllCells = function(obj, rows, cells){ // get first cells to array myCells
    var gameTable = $('#gameField')[0];
    var self = this;
    this.myCells.push(gameTable.rows[rows].cells[cells]);
    this.currentColor = $(gameTable.rows[rows].cells[cells]).css("backgroundColor");
    this.colorAllCells = function () {
        $.each(self.myCells, function () {
            $(this).css('backgroundColor', self.currentColor)
        })
    };
    $.each($('#panel td'), function () {
       if ($(this).css('backgroundColor') == self.currentColor){
           $(this).addClass('shadow');
       }
    });
    compareCells.call(obj, rows, cells);
};
$(document).ready(function(){
    drawGameTable();
    drawGamePanel();
    getAllCells.call(playerField, playerField,24,24);
    getAllCells.call(myField, myField,0,0);
    var moves = 0; // number of moves player
    var $allCells = $('#gameField td'); //all cells in game field

    myField.size =  myField.myCells.length;
    $('#player1').html('<b>'+myField.size+'</b>');
    $('#player1+td').html('<b>'+moves+'</b>');
    $(myField.myCells).addClass('myField');

    playerField.size =  playerField.myCells.length;
    $('#player2').html('<b>'+playerField.size+'</b>');
    $(playerField.myCells).addClass('myField');

    $('#panel td').on('click', function () {
        if (this.className == 'shadow'){ // if disabled colors
            return;
        }
        moves++;
        $.each($('#panel td.shadow'), function () {
           if ($(this).css('backgroundColor') == myField.currentColor){
               $(this).removeClass('shadow'); //remove shadow previous element
           }
        });
        myField.currentColor = $(this).css('backgroundColor');
        myField.colorAllCells();
        compareCells.call(myField, 0, 0);

        $(this).addClass('shadow');
        myField.size = myField.myCells.length;
        $(myField.myCells).addClass('myField');
        $('#player1').html('<b>'+myField.size+'</b>');
        $('#player1+td').html('<b>'+moves+'</b>');

        $allCells.removeClass("no-shadow").addClass('shadow');
        setTimeout(function () {
            $allCells.removeClass('shadow').addClass('no-shadow');
        }, 1200);
        setTimeout(function () {
            var element = chooseElementEasyBot();
            $.each($('#panel td.shadow'), function () {
                if ($(this).css('backgroundColor') == playerField.currentColor) {
                    $(this).removeClass('shadow');
                }
            });
            playerField.currentColor = $(element).css('backgroundColor');
            playerField.colorAllCells();
            compareCells.call(playerField, 24, 24);
            $(element).addClass('shadow');
            playerField.size = playerField.myCells.length;
            $(playerField.myCells).addClass('myField');
            $('#player2').html('<b>'+playerField.size+'</b>');

            $allCells.removeClass("no-shadow").addClass('shadow');
            setTimeout(function () {
                $allCells.removeClass('shadow').addClass('no-shadow');
            }, 1200);
            },2400);
        if (myField.size+playerField.size >= 625){
            if (myField.size>playerField.size){
                alert("YOU WIN!GOOD JOB!")
            }
            if (myField.size<playerField.size){
                alert("YOU LOSE!TRY AGAIN!")
            }
            if (myField.size == playerField.size){
                alert("WTF!?")
            }
        }
    });

/*    $('#select').on('change', function () {

    });*/

    $('#gameField').on('mousedown', function () {
        $allCells.removeClass('no-shadow').addClass('shadow');
    })
                   .on('mouseup', function () {
                        $allCells.removeClass('shadow').addClass('no-shadow');
    });

    $('#player1').prev().find('img').on('click', function () { // click on picture to change name
        var name = prompt('Change  name?','Player1');
        if (name){
            $(this).prev().text(name);
        }
    })
});
function chooseElementEasyBot() {
    var choise =  $('#select');
    if (choise.val() == 'easy') {
        var arr = [];
        $.each($('#panel td:not(.shadow)'), function () {
            arr.push(this);
        });
        return arr[Math.floor(Math.random() * 4)];
    }
    if (choise.val() == 'medium'){
        var self = playerField;
        var gameTable = $('#gameField')[0];
        var colors = $('#panel td:not(.shadow)');
        var newColors = [[], [], [], []];
        var maxColors = 0;
        for (var l=0; l<colors.length; l++) {
            var length = 1;
            var index = $('#gameField td').index(self.myCells[0]);
            for (var i = 0; i < length; i++) {
                //var index = $('#gameField td').index(self.myCells[i]);
                var y = Math.floor(index / 25);// index of row
                var x = index % 25; // index of cell
                if (gameTable.rows[y] && gameTable.rows[y].cells[x + 1]) { // if element exist
                    if (colors[l].style.backgroundColor == gameTable.rows[y].cells[x + 1].style.backgroundColor) { //step right
                        if ($.inArray(gameTable.rows[y].cells[x + 1], newColors[l]) == -1) {
                            newColors[l].push(gameTable.rows[y].cells[x + 1]);
                        }
                    }
                }
                if (gameTable.rows[y] && gameTable.rows[y].cells[x - 1]) {
                    if (colors[l].style.backgroundColor == gameTable.rows[y].cells[x - 1].style.backgroundColor) { // step left
                        if ($.inArray(gameTable.rows[y].cells[x - 1], newColors[l]) == -1) {
                            newColors[l].push(gameTable.rows[y].cells[x - 1]);
                        }
                    }
                }
                if (gameTable.rows[y + 1] && gameTable.rows[y + 1].cells[x]) {
                    if (colors[l].style.backgroundColor == gameTable.rows[y + 1].cells[x].style.backgroundColor) { //step down
                        if ($.inArray(gameTable.rows[y + 1].cells[x], newColors[l]) == -1) {
                            newColors[l].push(gameTable.rows[y + 1].cells[x]);
                        }
                    }
                }
                if (gameTable.rows[y - 1] && gameTable.rows[y - 1].cells[x]) {
                    if (colors[l].style.backgroundColor == gameTable.rows[y - 1].cells[x].style.backgroundColor) { // step up
                        if ($.inArray(gameTable.rows[y - 1].cells[x], newColors[l]) == -1) {
                            newColors[l].push(gameTable.rows[y - 1].cells[x]);
                        }
                    }
                }
                if (!(self.myCells[i+1]) && newColors.length>0 && length<(self.myCells.length+newColors[l].length)){
                    length++;
                    //length += newColors.length;
                    index = $('#gameField td').index(newColors[l][i-(self.myCells.length-1)]);
                }
                else {
                    length = self.myCells.length;
                    index = $('#gameField td').index(self.myCells[i+1]);
                }

            }
            if (maxColors<newColors[l].length){
                maxColors = newColors[l].length;
                var maxArray = newColors[l];
            }
        }
        $.each(colors, function () {
           if ($(this).css('backgroundColor') == $(maxArray).css('backgroundColor')){
               maxArray = this;
           }
        });
        if (!maxArray){
            return colors[Math.floor(Math.random()*4)]
        }
        return maxArray
    }
}

function compareCells(rows, cells) { // compare and add cells to array myCells
    var self = this;
    var gameTable = $('#gameField')[0];
    self.currentColor = $(gameTable.rows[rows].cells[cells]).css("backgroundColor");
    var length = 1;
    for (var i=0; i<length; i++) {
        var index = $('#gameField td').index(self.myCells[i]);
        var y = Math.floor(index / 25);// index of row
        var x = index % 25; // index of cell
        if (gameTable.rows[y] && gameTable.rows[y].cells[x + 1]) { // if element exist
            if (self.currentColor == gameTable.rows[y].cells[x + 1].style.backgroundColor) { //step right
                if ($.inArray(gameTable.rows[y].cells[x + 1], self.myCells) == -1) {
                    self.myCells.push(gameTable.rows[y].cells[x + 1]);
                }
            }
        }
        if (gameTable.rows[y] && gameTable.rows[y].cells[x - 1]) {
            if (self.currentColor == gameTable.rows[y].cells[x - 1].style.backgroundColor) { // step left
                if ($.inArray(gameTable.rows[y].cells[x - 1], self.myCells) == -1) {
                    self.myCells.push(gameTable.rows[y].cells[x - 1]);
                }
            }
        }
        if (gameTable.rows[y + 1] && gameTable.rows[y + 1].cells[x]) {
            if (self.currentColor == gameTable.rows[y + 1].cells[x].style.backgroundColor) { //step down
                if ($.inArray(gameTable.rows[y + 1].cells[x], self.myCells) == -1) {
                    self.myCells.push(gameTable.rows[y + 1].cells[x]);
                }
            }
        }
        if (gameTable.rows[y - 1] && gameTable.rows[y - 1].cells[x]) {
            if (self.currentColor == gameTable.rows[y - 1].cells[x].style.backgroundColor) { // step up
                if ($.inArray(gameTable.rows[y - 1].cells[x], self.myCells) == -1) {
                    self.myCells.push(gameTable.rows[y - 1].cells[x]);
                }
            }
        }
        length = self.myCells.length;
    }
}

function drawGameTable() {
    var table = $('<table></table>').addClass('table').attr('id', 'gameField');// create table(game field) with different colors
    for(var i=0; i<25; i++){
        var row = $('<tr></tr>');
        table.append(row);
        for(var j=0; j<25; j++){
            var td = $('<td></td>');
            td.css("background", getColorsCells(true));
            if (i == 24  && j == 24){ // draw player cell
                while(td.css("backgroundColor") == table.find("td")[0].style.backgroundColor){ //different colors
                    td.css("background", getColorsCells(true));
                }
            }
            row.append(td);
        }
    }
    $('#field').append(table);
}

function drawGamePanel() {
    var table = $('<table cellspacing="15px"></table>');// create table(game panel) on the right
    for(var i=0; i<6; i++){
        var row = $('<tr></tr>');
        table.append(row);
        for(var j=0; j<1; j++){
            var td = $('<td></td>');
            td.css("background", getColorsCells(false, i));
            row.append(td);
        }
    }
    $('#panel').append(table);
}

function getColorsCells(random, i) {
    var red = "#FF0000";
    var green = "#00FF00";
    var yellow = "#FFFF00";
    var violette = "#A020F0";
    var cyan = "#00FFFF";
    var blue = "#0000FF";
    var arrColors = [red, green, yellow, violette, cyan, blue];
    if (random) {
        return arrColors[Math.round(Math.random()*5)]; // chose random color for table cell
    }
    else {
         return arrColors[i];
    }
}


