function generateWinningNumber(){
    var min = Math.ceil(1);
    var max = Math.floor(101);
    return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(inputArr){
    var elemsLeft = inputArr.length, t, i;
    while (elemsLeft) {
    i = Math.floor(Math.random() * elemsLeft--);
    t = inputArr[elemsLeft];
    inputArr[elemsLeft] = inputArr[i];
    inputArr[i] = t;
  }
  return inputArr;
}

function Game(){
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function(){
    if((this.playersGuess-this.winningNumber) < 0){
        return (this.playersGuess-this.winningNumber) * -1;
    } else {
        return this.playersGuess-this.winningNumber;
    }
}

Game.prototype.isLower = function(){
    if(this.playersGuess < this.winningNumber){
        return true;
    } else {
        return false;
    }
}

Game.prototype.playersGuessSubmission = function(num){
    return this.checkGuess(num);
}

Game.prototype.checkGuess = function(num){
    this.playersGuess = num;
    var diff = this.difference();
    if(num < 1 || num > 100 || isNaN(num)){
        return {title: "That is an invalid guess.", subtitle: 'Please submit a positive integer between 1 and 100.'};
    } else if (num === this.winningNumber){
        this.pastGuesses.push(num);
        return {title: 'You Win!', subtitle: 'Press the Reset button to play again!'};
    } else if (this.pastGuesses.indexOf(num) !== -1){
        if(this.isLower()){
            return {title: 'You have already guessed that number.', subtitle: 'Guess higher.'};
        } else {
            return {title: 'You have already guessed that number.', subtitle: 'Guess lower.'};
        } 
    } else if (this.pastGuesses.indexOf(num) === -1 && this.pastGuesses.length === 4){
        this.pastGuesses.push(num);
        return {title: 'You Lose.', subtitle: 'Press the Reset button to play again!'};
    } else if (this.pastGuesses.indexOf(num) === -1 && diff < 10){
        this.pastGuesses.push(num);
        if(this.isLower()){
            return {title: 'You\'re burning up!', subtitle: 'Guess higher.'};
        } else {
            return {title: 'You\'re burning up!', subtitle: 'Guess lower.'};
        }
    } else if (this.pastGuesses.indexOf(num) === -1 && diff < 25){
        this.pastGuesses.push(num);
        if(this.isLower()){
            return {title: 'You\'re lukewarm.', subtitle: 'Guess higher.'};
        } else {
            return {title: 'You\'re lukewarm.', subtitle: 'Guess lower.'};
        }
    } else if (this.pastGuesses.indexOf(num) === -1 && diff < 50){
        this.pastGuesses.push(num);
        if(this.isLower()){
            return {title: 'You\'re a bit chilly.', subtitle: 'Guess higher.'};
        } else {
            return {title: 'You\'re a bit chilly.', subtitle: 'Guess lower.'};
        }
    } else {
        this.pastGuesses.push(num);
        if(this.isLower()){
            return {title: 'You\'re ice cold!', subtitle: 'Guess higher.'};
        } else {
            return {title: 'You\'re ice cold!', subtitle: 'Guess lower.'};
        }
    }
}

function newGame(){
    return new Game();
}

Game.prototype.provideHint = function (){
    var hintArr = [this.winningNumber];
    hintArr.push(generateWinningNumber());
    hintArr.push(generateWinningNumber());
    return shuffle(hintArr);
}

var handleGuesses = function(gameInstance){  
    var guessString = $('#player-input').val();
    var guessNum = parseInt(guessString, 10);
    $('#player-input').val('');
    var output = gameInstance.playersGuessSubmission(guessNum);
    return output;
}

$(document).ready(function(){    
    var game = new Game();
    var processedGuess = null;
    var innerEventFn = function(){
        var orderNum = game.pastGuesses.length + 1;
        processedGuess = handleGuesses(game);
        $('#title').text(processedGuess.title);
        $('#subtitle').text(processedGuess.subtitle);
        $('.guess:nth-child(' + orderNum + ')').text(game.pastGuesses[orderNum - 1]);
        if($('#title').text() == 'You Win!' || $('#title').text() == 'You Lose.'){
            $('#submit, #hint').prop('disabled', true);
            $('#submit, #hint').addClass('cursor-disabled');            
        }
    }
    $('#submit').click(function(){
        $('#player-input').focus();
        innerEventFn();
    })

    $('#player-input').keypress(function(event){
        if(event.which == 13){
            innerEventFn();
        }
        
    })

    $('#reset').click(function(){
        $('#submit, #hint').prop('disabled', false);
        $('#submit, #hint').removeClass('cursor-disabled'); 
        $('#player-input').focus();
        $('#title').text('Play the Guessing Game!');
        $("#subtitle").text('Guess a number between 1-100!');
        $('.guess').text('-');
        game = new Game();
    })

    $('#hint').click(function(){
        var hintArr = game.provideHint();
        $('#title').text('The winning number is ' + hintArr[0] + ', ' + hintArr[1] + ' or ' + hintArr[2] + '.')
    })
})












// $('#title').text(game.playersGuessSubmission(handleGuesses(game)))

// function generateWinningNumber(){
//     var min = Math.ceil(1);
//     var max = Math.floor(101);
//     return Math.floor(Math.random() * (max - min)) + min;
// }

// function shuffle(inputArr){
//     var elemsLeft = inputArr.length, t, i;
//     while (elemsLeft) {
//     i = Math.floor(Math.random() * elemsLeft--);
//     t = inputArr[elemsLeft];
//     inputArr[elemsLeft] = inputArr[i];
//     inputArr[i] = t;
//   }
//   return inputArr;
// }

// function Game(){
//     this.playersGuess = null;
//     this.pastGuesses = [];
//     this.winningNumber = generateWinningNumber();
// }

// Game.prototype.difference = function(){
//     if((this.playersGuess-this.winningNumber) < 0){
//         return (this.playersGuess-this.winningNumber) * -1;
//     } else {
//         return this.playersGuess-this.winningNumber;
//     }
// }

// Game.prototype.isLower = function(){
//     if(this.playersGuess < this.winningNumber){
//         return true;
//     } else {
//         return false;
//     }
// }

// Game.prototype.playersGuessSubmission = function(num){
//     return this.checkGuess(num);
// }

// Game.prototype.checkGuess = function(num){
//     this.playersGuess = num;
//     var diff = this.difference();
//     if(num < 1 || num > 100 || isNaN(num)){
//         throw 'That is an invalid guess.';
//     } else if (num === this.winningNumber){
//         return 'You Win!';
//     } else if (this.pastGuesses.indexOf(num) !== -1){
//         return 'You have already guessed that number.';   
//     } else if (this.pastGuesses.indexOf(num) === -1 && this.pastGuesses.length === 4){
//         return 'You Lose.';
//     } else if (this.pastGuesses.indexOf(num) === -1 && diff < 10){
//         this.pastGuesses.push(num);
//         return 'You\'re burning up!';
//     } else if (this.pastGuesses.indexOf(num) === -1 && diff < 25){
//         this.pastGuesses.push(num);
//         return 'You\'re lukewarm.';
//     } else if (this.pastGuesses.indexOf(num) === -1 && diff < 50){
//         this.pastGuesses.push(num);
//         return 'You\'re a bit chilly.';
//     } else {
//         this.pastGuesses.push(num);
//         return 'You\'re ice cold!';
//     }
// }

// function newGame(){
//     return new Game();
// }

// Game.prototype.provideHint = function (){
//     var hintArr = [this.winningNumber];
//     hintArr.push(generateWinningNumber());
//     hintArr.push(generateWinningNumber());
//     return shuffle(hintArr);
// }

// var handleGuesses = function(gameInstance){  
//     var guess = +$('#player-input').val();
//     $('#player-input').val('');
//     var output = gameInstance.playersGuessSubmission(guess);
//     console.log(output);
// }

// $(document).ready(function(){    
//     var game = new Game();
//     var processedGuess = handleGuesses(game)
//     $('#submit').click(function(event){
//         processedGuess;
//         $('#title').text(game.playersGuessSubmission(processedGuess));
//     })

//     $('#player-input').keypress(function(event){
//         if(event.which == 13){
//             processedGuess;
//         }
        
//     })
// })