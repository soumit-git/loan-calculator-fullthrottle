import React, { Component } from 'react';
import Axios from 'axios';
import InputRange from 'react-input-range';


export default class LoanCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {loanAmount: 500,
      duration: 6,
      monthlyPayment: 0,
      interestRate: 0,
      numberOfPayments: 0,
      principal: 0,
    };

    Axios.get(`https://ftl-frontend-test.herokuapp.com/interest?amount=${this.state.loanAmount}&numMonths=${this.state.duration}`).then((res) => {
      //console.log(res);
      this.setState({
        loanAmount: 500,
        duration: 6,
        monthlyPayment: res.data.monthlyPayment.amount,
        interestRate: res.data.interestRate,
        numberOfPayments: res.data.numPayments,
        principal: res.data.principal.amount
      })
    });
    //console.log(this.state);
    
  }

  handleChangeLoanAmount = (value) => {
    value = Number.parseInt(value);
    
    Axios.get(`https://ftl-frontend-test.herokuapp.com/interest?amount=${value}&numMonths=${this.state.duration}`).then((res) => {
      //console.log(res);
      this.setState({
        ...this.state,
        loanAmount: value,
        monthlyPayment: res.data.monthlyPayment.amount,
        interestRate: res.data.interestRate,
        numberOfPayments: res.data.numPayments,
        principal: res.data.principal.amount
      })
    });
    //console.log(this.state);
  }

  handleChangeDuration = (value) => {
    value = Number.parseInt(value);
    Axios.get(`https://ftl-frontend-test.herokuapp.com/interest?amount=${this.state.loanAmount}&numMonths=${value}`).then((res) => {
      //console.log(res);
      this.setState({
        ...this.state,
        duration: value,
        monthlyPayment: res.data.monthlyPayment.amount,
        interestRate: res.data.interestRate,
        numberOfPayments: res.data.numPayments,
        principal: res.data.principal.amount
      })
    });
    //console.log(this.state);
  }
 
  render() {
    
    return (
      <div>
      <div className="bg-danger pt-2 pb-1">
        <h3 className="text-center text-light">Loan Calculator</h3>
      </div>
      <div className="container">
        <form className="mt-1 p-3">
          <div className="form-group">
            <label >Loan Amount</label><br /><br />
            <InputRange
              maxValue={5000}
              minValue={500}
              value={this.state.loanAmount}
              formatLabel={value => value+'$'}
              onChangeComplete = {this.handleChangeLoanAmount}
              onChange = {this.handleChangeLoanAmount}
              step={500}
            />
          </div>
          <div className="form-group">
            <label >Loan Duration</label><br /><br />
            
            <InputRange
              maxValue={24}
              minValue={6}
              value={this.state.duration}
              formatLabel={value => value+'m'}
              onChange = {this.handleChangeDuration}
            />
          </div>
          <div className="form-group">
            <label >Monthly payment</label>
            <h3>{this.state.monthlyPayment}$</h3>
          </div>
          <div className="form-group">
            <label >Interest Rate</label>
            <h3>{this.state.interestRate}%</h3>
          </div>
          <div className="form-group">
            <label >Number of payments</label>
            <h3>{this.state.numberOfPayments}</h3>
          </div>
          <div className="form-group">
            <label >Principal</label>
            <h3>{this.state.principal}$</h3>
          </div>
        </form>
      </div>
      </div>
    );
  }
}

