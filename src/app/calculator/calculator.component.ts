import {Component, ElementRef, AfterViewInit} from '@angular/core';

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

  isUnaryOperation(operation = ""){
    if(operation!=""){
      return (operation == "!" || operation == "?")  
    }
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

  compute(operation="") {
    let computation
    
    const prev = this.isUnaryOperation(operation)? 0: parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)

    if (isNaN(prev) || isNaN(current)) return
    if(operation == "") operation = this.operation
    switch (operation) {
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
    if(this.isUnaryOperation(operation)){
      this.previousOperand = this.currentOperand
    }
    this.currentOperand = computation
    this.operation = ''
    if(!this.isUnaryOperation(operation)){
      this.previousOperand = ''
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
  
  appendNumber(number: string) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation: string) {
    if (this.currentOperand === '') return
    if (this.isUnaryOperation(operation)) {
      this.compute(operation)
    }
    else if( this.previousOperand !== '' ){
      this.compute()
    }
    this.operation = operation
    if(!this.isUnaryOperation()){
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
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
      this.previousOperandTextElement!.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement!.innerText = ''
    }
  }

  numberButtonsclick(innerText: any){
    if(this.isUnaryOperation()){
      this.currentOperandTextElement!.innerText = ''
      this.clear()
    }
    this.appendNumber(innerText)
    this.updateDisplay()
    CalculatorComponent.lastClick = innerText
  }

  operationButtonsclick(innerText: any)  {
    if(this.operation == "?"){
      this.currentOperandTextElement!.innerText = ''
      this.currentOperand = ''
    }
    if(this.isUnaryOperation()){
      this.operation = ''
      this.previousOperand = ''
    }
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
