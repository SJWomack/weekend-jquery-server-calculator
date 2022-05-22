module.exports = 
    function mathOperations(operator,num1, num2){
        if (operator === '*'){
         let answer =   Number(num1) * Number(num2) 
            return answer;
        }
       else if (operator === '/'){
            let answer = Number(num1) / Number(num2) 
               return answer;
           }
        else if (operator === '-'){
            let answer =   Number(num1) - Number(num2) 
               return answer;
           }
        else if (operator === '+'){
            let answer =   Number(num1) + Number(num2) 
               return answer;
           }
    }

