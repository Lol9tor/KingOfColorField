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
var prevElement;
var getAllCells = function(){ // get first cells to array myCells
    var gameTable = $('#gameField')[0];
    this.myCells.push(gameTable.rows[0].cells[0]);
    this.currentColor = $(gameTable.rows[0].cells[0]).css("backgroundColor");
    this.colorAllCells = function () {
        $.each(myField.myCells, function () {
            $(this).css('backgroundColor', myField.currentColor)
        })
    };
    $.each($('#panel td'), function () {
       if ($(this).css('backgroundColor') == myField.currentColor){
           $(this).addClass('shadow');
           prevElement = this;
       }
    });
    compareCells.call(myField);
};
$(document).ready(function(){
    drawGameTable();
    drawGamePanel();
    getAllCells.call(myField);
    //var userName = prompt("What's your name?", "Player");
    var moves = 0; // number of moves player
    myField.size =  myField.myCells.length;
    $('#player1').html('<b>'+myField.size+'</b>');
    //            .prev().html(userName);
    $(myField.myCells).addClass('myField');
    $('#player1+td').html('<b>'+moves+'</b>');
    $('#panel td').on('click', function () {
        if (this.className == 'shadow'){
            return;
        }
        moves++;
        myField.currentColor = $(this).css('backgroundColor');
        myField.colorAllCells();
        compareCells.call(myField);
        $(prevElement).removeClass('shadow');
        $(this).addClass('shadow');
        prevElement = this;
        myField.size = myField.myCells.length;
        $(myField.myCells).addClass('myField');
        $('#player1').html('<b>'+myField.size+'</b>');
        $('#player1+td').html('<b>'+moves+'</b>')
    });
    $('#gameField').on('mousedown', function () {
        $('#gameField td').addClass('shadow');
    })
        .on('mouseup', function () {
        $('#gameField td').removeClass('shadow');
    })
});

function compareCells() { // compare and add cells to array myCells
    var self = this;
    var gameTable = $('#gameField')[0];
    self.currentColor = $(gameTable.rows[0].cells[0]).css("backgroundColor");
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


