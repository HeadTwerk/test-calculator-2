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

  appendNumber(number: string) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation: string) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
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
    this.currentOperandTextElement!.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != '') {
      this.previousOperandTextElement!.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement!.innerText = ''
    }
  }

  numberButtonsclick(innerText: any){
    this.appendNumber(innerText)
    this.updateDisplay()
  }

  operationButtonsclick(innerText: any)  {
    this.chooseOperation(innerText)
    this.updateDisplay()
  }

  equalsButtonclick(){
    this.compute()
    this.updateDisplay()
  }

  allClearButtonclick(){
    this.clear()
    this.updateDisplay()
  }

  deleteButtonclick(){
    this.delete()
    this.updateDisplay()
  }
}




// const calculator = new CalculatorComponent()

