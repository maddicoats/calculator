const onOff = document.querySelector('#onOff')
onOff.addEventListener('click', (event) => { 
    document.querySelector('.output').classList.toggle('off')
    if (document.querySelector('.output').classList.contains('off')) {
        clear()
        updateOutput()
        return;
    }
})


const calculator = {
    outputValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

function inputNumber(number) {
    const { outputValue, waitingForSecondOperand } = calculator;

    if (number === '.' && outputValue.includes('.') && calculator.operator !== null) {
        calculator.outputValue = outputValue === '0' ? number : outputValue + number;
    } else if (number === '.' && outputValue.includes('.')) return;

    if (waitingForSecondOperand === true) {
        calculator.outputValue = number;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.outputValue = outputValue === '0' ? number : outputValue + number;
    }
}

function inputOperator(nextOperator) {
    const { firstOperand, outputValue, operator } = calculator
    const inputValue = parseFloat(outputValue);

    if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
    }
    
    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator)

        calculator.outputValue = String(result);
        calculator.firstOperand = result;
    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
    if (operator === '=') {
        return firstOperand + secondOperand;
    } else if (operator === '-') {
        return firstOperand - secondOperand;
    } else if (operator === '*') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    }
    return secondOperand;
}

function clear() {
  calculator.outputValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

function updateOutput() {
    const output = document.querySelector('.output')
    output.innerHTML = calculator.outputValue
}
updateOutput()


const keys = document.querySelector('.container');
keys.addEventListener('click', (event) => {
    const { target } = event;

    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        inputOperator(target.value);
        updateOutput();
        return;
    }

    if (target.classList.contains('clear')) {
        clear();
        updateOutput();
        return;
    }

    inputNumber(target.value);
    updateOutput();
});