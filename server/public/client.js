$(onReady)

function onReady() {
    console.log('R U readaaaaaaye')
    handleGet();
    $('.calc-btn').on('click', onNumberOrOperatorClick);
    $('#clear-display').on('click', handleClearDisplay);
    $('#btn-equals').on('click', postPackageHandler)
    $('#empty-reel').on('click', handleReelDelete);
    $('#history-list').on('click', '.reel-itm', grabEquation)
}

//establish variables I'll be using
let firstNum = '';
let firstValBool = true;
let secondNum = '';
let operator = '';
let postPackage = {};

//handles appending input equation to calc display
function appendCalcDisplay() {
    console.log('in append calc')
    $('#calc-display').val(firstNum + ' ' + operator + ' ' + secondNum)
}

//handles the switch from imputing first number to inputting second number
//achieved by any operator input changing first val boolean to false
//signaling the second value input
function onNumberOrOperatorClick(evt) {
    evt.preventDefault()
   if ($(this).text() === '+' || $(this).text() === '-' || $(this).text() === '*' || $(this).text() === '/') {
        firstValBool = false;
        console.log(firstValBool);

        operator = $(this).text();
        console.log(operator);
    }
    else if (firstValBool === true) {
        firstNum += $(this).text();
        console.log(firstNum);
    }
    else {
        secondNum += $(this).text();
        console.log(secondNum);
    }

    console.log('text value', $(this).text())

    appendCalcDisplay();
}

//handles clearing of display and resetting all input values
function handleClearDisplay() {
    $('#calc-display').val('');
    firstNum = '';
    firstValBool = true;
    secondNum = '';
    operator = '';

}

//handles creation of object that will be sent in post request
function postPackageHandler(evt) {
    evt.preventDefault();
    postPackage.firstNumber = firstNum;
    postPackage.secondNumber = secondNum;
    postPackage.operator = operator;
    console.log(postPackage);
    handlePost();
}

//checks that no inputs are empty then 
//sends post request and shows answer in calc display
function handlePost() {
    if (postPackage.firstNumber === '') {
        alert('Please input a first number.');
        return false;
    }
    else if (postPackage.operator === '') {
        alert('Please input an operator (+, -, *, /).');
        return false;
    }
    else if (postPackage.secondNumber === '') {
        alert('Please input a second number.')
        return false;
    }

    $.ajax({
        url: '/equation',
        method: 'POST',
        data: postPackage,
    }).then((response) => {
        console.log(response)
        postPackage = {};
        console.log(postPackage);
        handleClearDisplay();
        $('#calc-display').val(response);
        handleGet();
    })
}

//handles the get request and appends all equations stored server side on to the dom
function handleGet() {
    $.ajax({
        url: '/answerArray',
        method: 'GET',
    }).then((response) => {
        console.log(response)
        $('#history-list').empty();
        for (let equation of response)
            $('#history-list').append(`<li class="reel-itm"> ${equation.numberOne} ${equation.operator} ${equation.numberTwo} <span class='answer' hidden>${equation.answer}</span></li>`)
    })
}


//handles delete request to clear server side equation storage
function handleReelDelete(evt) {
    evt.preventDefault();
    $.ajax({
        url: '/emptySolved',
        method: 'DELETE'
    }).then((response) => {
        console.log('delete', response);
        handleGet();

    })

}

//grabs hidden answer of past equation displayed on dom and displays in calc display
function grabEquation(){
  newInput =  $(this).children().text();
  $('#calc-display').val(newInput);
}