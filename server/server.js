const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT =  process.env.PORT || 5000;


// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

const math = require('./modules/math')

let solvedEquations = require('./modules/solvedEquationArray')


//takes in post object and calculates answer
//then packages and sends to storage array
//responds with answer to equation
app.post('/equation',(req, res) => {
  let operator = req.body.operator;
  let num1 = req.body.firstNumber;
  let num2 = req.body.secondNumber;
  let answer = math(operator,num1,num2)

  solvedEquations.push({
    operator: operator,
    numberOne: num1,
    numberTwo: num2,
    answer: answer
  });

  console.log(solvedEquations);
  res.send(`${answer}`);
})

//takes get request and sends back storage array
app.get('/answerArray', (req, res) =>{
  console.log('in get',solvedEquations);
  res.send(solvedEquations);
})

//takes delete request and clears storage array
app.delete('/emptySolved', (req, res) => {
  solvedEquations = [];
  console.log ('in dele', solvedEquations);
  res.send('Delete req received')
})














app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
 

  })