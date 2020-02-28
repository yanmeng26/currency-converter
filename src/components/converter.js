// this file is for currency converter front side 
//author: Meng Yan
//date:02/27/2020

import React, { Component } from "react";
import "../css/converter.css";

class Converter extends Component {
  constructor() {
    super();

    this.state = {
      base_currency: "",
      base_amount: "",
      target_currency: "",
      target_amount:"",
      currencyList: []
       
    };
  }

  //fetch dropdown list from backend automatically
  componentDidMount() {
    fetch("http://18.220.29.129:8080/api/currencyKeys")
      .then(data => data.json())
      .then(response => {
          this.setState({currencyList: response})
        }
      ).catch(function (error) {
      console.error('Fetching latest currency list failed', error)
    });
  }

  changeHandler = e => this.setState({ [e.target.name]: e.target.value });

  resetHandler = e =>{
    window.location.reload();
  }

  submitHandler = e => {
    console.log("submit")
    const props = this.state
    let params = {
      "base_currency": props.base_currency,
      "base_amount":props.base_amount,
      "target_currency":props.target_currency
    };
    let query = Object.keys(params)
             .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
             .join('&');

     let url = `http://18.220.29.129:8080/api/convert?`+ query;

     if (props.base_currency !== "" && props.base_amount >= 0 && props.base_amount<=999999999999&& props.target_currency!=="") {
      e.preventDefault();
    
     fetch(url)
     .then(data => data.json())
     .then((response) => {
       //console.log('request succeeded with JSON response', response)
       let result = response.target_amount.toFixed(2);
       this.setState({target_amount:result});
     }).catch(function (error) {
       console.log('request failed', error)
     });
     }
     else if(props.base_amount<0)
     {
       alert("Amount should not be negative")
      
       
     }
     else if(props.base_amount>999999999999)
     {
       alert("Amount should be less than 999999999999")
      
     }
  };  

  render() {
    return (
      <div>
        
        <div className="container">
          
          <h1> Currency Conversion</h1>
          <div className="form-group result">
                    <label htmlFor="amount">Target Amount: <label >{this.state.target_amount} </label> </label>
                    
                </div>
            <form>
                <div className="form-group">
                    <label htmlFor="currency">From: <span className="required">*</span></label>
                  <select onChange={ this.changeHandler} name = "base_currency"value={this.state.base_currency} required>
                    <option value="">Please Select</option>
                    {this.state.currencyList.map((currency, index) =>
                      <option value={currency}>{currency}</option>)
                    }
                  </select>
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount:<span className="required">*</span> </label>
                    <input onChange={this.changeHandler} type="number" name ="base_amount"  value={this.state.base_amount}/>
                </div>
                <div className="form-group">
                    <label htmlFor="currency">To: <span className="required">*</span></label>
                    <select onChange={this.changeHandler} name="target_currency" value={this.state.target_currency} required>
                        <option value="">Please Select</option>
                      {this.state.currencyList.map((currency, index) =>
                        <option value={currency}>{currency}</option>)
                      }
                      </select>
                </div>
                
                <div className="form-group">
                  <button onClick={(e) => this.submitHandler(e)} className="no-style button button-primary" type="submit">Calculate </button>
                  <button  onClick={(e) => this.resetHandler(e)} className="no-style button button-primary reset" type="submit">Reset </button>
                </div>
            </form>

            
        </div>
      </div>
    )
  }
}

export default Converter;
