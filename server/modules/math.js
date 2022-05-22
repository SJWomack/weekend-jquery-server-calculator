module.exports = 
//determins which operation to run by the operator string 
//packaged in the post object
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

