$(onReady)

function onReady() {
    console.log('R U readaaaaaaye')
    handleGet();
    $('.calc-btn').on('click', onNumberOrOperatorClick);
    $('#clear-display').on('click', handleClearDisplay);
    $('#btn-equals').on('click', postPackageHandler)
}

let firstNum = '';
let firstValBool = true;
let secondNum = '';
let operator = '';
let postPackage = {};


function appendCalcDisplay() {
    console.log('in append calc')
    $('#calc-display').val(firstNum + ' ' + operator + ' ' + secondNum)
}

function onNumberOrOperatorClick(evt) {
    evt.preventDefault()
    if ($(this).text() === '+' || $(this).text() === '-' ||$(this).text() ===  '*' || $(this).text() === '/') {
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

    console.log( 'text value',$(this).text())

    appendCalcDisplay();
}

function handleClearDisplay() {
    $('#calc-display').val('');
    firstNum = '';
    firstValBool = true;
    secondNum = '';
    operator = '';

}

function postPackageHandler(evt) {
    evt.preventDefault();
    postPackage.firstNumber = firstNum;
    postPackage.secondNumber = secondNum;
    postPackage.operator = operator;
    console.log(postPackage);
    handlePost();
}

function handlePost() {
    if (postPackage.firstNumber === ''){
        alert('Please input a first number.');
        return false;
    }
    else if (postPackage.operator === ''){
        alert('Please input an operator (+, -, *, /).');
        return false;
    }
    else if (postPackage.secondNumber === ''){
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
        handleGet();
    })
}


function handleGet(){
    $.ajax({
        url: '/answerArray',
        method: 'GET',
    }).then((response) => {
        console.log(response)
        $('#history-list').empty();
        for (let equation of response)
        $('#history-list').append(`<li> ${equation.numberOne} ${equation.operator} ${equation.numberTwo} = ${equation.answer}
        `)
    })
}

