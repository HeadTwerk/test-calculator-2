import {Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

// const numberButtons = document.querySelectorAll('[data-number]')
// const operationButtons = document.querySelectorAll('[data-operation]')
// const equalsButton = document.querySelector('[data-equals]')
// const deleteButton = document.querySelector('[data-delete]')
// const allClearButton = document.querySelector('[data-all-clear]')
// const previousOperandTextElement : HTMLElement
// const currentOperandTextElement : HTMLElement

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements AfterViewInit {
  title = 'Calculator';
  currentOperand: any
  previousOperand: any
  operation = ''
  // @ViewChild("data_previous_operand", {static: false}) currentOperandTextElement: ElementRef ;
  // @ViewChild("data_current_operand", {static: false}) previousOperandTextElement: ElementRef ;
  currentOperandTextElement: HTMLElement | null
  previousOperandTextElement: HTMLElement | null
  static lastClick = ''
  static maxInt = 100001
  static boolArr = new Array(CalculatorComponent.maxInt)

  ngAfterViewInit(): void {
    this.previousOperandTextElement = <HTMLElement>document.querySelector('[data-previous-operand]')
    this.currentOperandTextElement = <HTMLElement>document.querySelector('[data-current-operand]')
  }

  // constructor(){}

  constructor(private el: ElementRef) {
    // window.addEventListener("load", function(){
    //   if(this.currentOperandTextElement == null){
    //     this.currentOperandTextElement = <HTMLElement>document.querySelector('[data-current-operand]')
    //   }
    //   if(this.previousOperandTextElement == null){
    //     this.previousOperandTextElement = <HTMLElement>document.querySelector('[data-previous-operand]')
    //   }
    // })
    this.previousOperandTextElement = <HTMLElement>document.querySelector('[data-previous-operand]')
    this.currentOperandTextElement = <HTMLElement>document.querySelector('[data-current-operand]')
    this.initPrimeSieve()
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = ''
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  isUnaryOperation(){
    return (this.operation == "!" || this.operation == "?")
  }

  factorial(value = 0){
    var fact = 1
    for(;value>1; value--){
      fact *= value
    }
    return fact
  }

  initPrimeSieve(){
    CalculatorComponent.boolArr.fill(true)
    CalculatorComponent.boolArr[0] = CalculatorComponent.boolArr[1] = false
    for(let i =2; i<= Math.sqrt(CalculatorComponent.maxInt); i++){
      for(let j = 2*i; j<CalculatorComponent.maxInt; j+=j){
        CalculatorComponent.boolArr[j] = false
      }
    }
  }

  isPrime(value = 0){
    if(CalculatorComponent.boolArr[value])
      return "true"
    else return "false"
  }

  compute() {
    let computation
    
    const prev = this.isUnaryOperation()? 0: parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)

    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '!':
        computation = this.factorial(current)
        break;
      case '?':
        computation = this.isPrime(current)
        break
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = ''
    this.previousOperand = ''
  }

  appendNumber(number: string) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation: string) {
    if (this.currentOperand === '') return
    if (
      this.previousOperand !== '' || 
      this.isUnaryOperation()
    ) {
      this.compute()
    }
    this.operation = operation
    if(!this.isUnaryOperation()){
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }
  }

  getDisplayNumber(number: Int32Array) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    if(typeof this.currentOperand != "string"){
      this.currentOperandTextElement!.innerText =
        this.getDisplayNumber(this.currentOperand)
    }
    else{
      this.currentOperandTextElement!.innerText = 
        this.currentOperand
    }

    if (this.operation != '' ) {
      if(!this.isUnaryOperation()){
        this.previousOperandTextElement!.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      }
      else{
        this.currentOperandTextElement!.innerText =
          `${this.getDisplayNumber(this.currentOperand)} ${this.operation}`
      }
    } else {
      this.previousOperandTextElement!.innerText = ''
    }
  }

  numberButtonsclick(innerText: any){
    if(CalculatorComponent.lastClick == '='){
      this.currentOperandTextElement!.innerText = ''
      this.clear()
    }
    this.appendNumber(innerText)
    this.updateDisplay()
    CalculatorComponent.lastClick = innerText
  }

  operationButtonsclick(innerText: any)  {
    this.chooseOperation(innerText)
    this.updateDisplay()
    CalculatorComponent.lastClick = innerText
  }

  equalsButtonclick(){
    this.compute()
    this.updateDisplay()
    CalculatorComponent.lastClick = '='
  }

  allClearButtonclick(){
    this.clear()
    this.updateDisplay()
    CalculatorComponent.lastClick = 'ac'
  }

  deleteButtonclick(){
    this.delete()
    this.updateDisplay()
    CalculatorComponent.lastClick = 'del'
  }
}




// const calculator = new CalculatorComponent()

