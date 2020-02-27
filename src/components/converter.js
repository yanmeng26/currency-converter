import React, { Component } from "react";

import "../css/converter.css";


class Converter extends Component {
  constructor() {
    super();

    this.state = {
      base_currency: "",
      base_amount: "",
      target_currency: "",
      target_amount:""

       
    };
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

     let url = `https://ec2-18-220-29-129.us-east-2.compute.amazonaws.com:8080/api/convert?`+ query;

     if (props.base_currency != "" && props.base_amount != "" && props.target_currency!="") {
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
                    <option value="USD" >USD</option>
                    <option value="JPY">JPY</option>
                    <option value="BGN">BGN</option>
                    <option value="CZK">CZK</option>
                    <option value="DKK">DKK</option>
                    <option value="GBP">GBP</option>
                    <option value="HUF">HUF</option>
                    <option value="PLN">PLN</option>
                    <option value="RON">RON</option>
                    <option value="SEK">SEK</option>
                    <option value="CHF">CHF</option>
                    <option value="ISK">ISK</option>
                    <option value="NOK">NOK</option>
                    <option value="HRK">HRK</option>
                    <option value="RUB">RUB</option>
                    <option value="TRY">TRY</option>
                    <option value="AUD">AUD</option>
                    <option value="BRL">BRL</option>
                    <option value="CAD">CAD</option>
                    <option value="CNY">CNY </option>
                    <option value="HKD">HKD</option>
                    <option value="IDR">IDR</option>
                    <option value="ILS">ILS</option>
                    <option value="INR">INR</option>
                    <option value="KRW">KRW </option>
                    <option value="MXN">MXN</option>
                    <option value="MYR">MYR</option>
                    <option value="NZD">NZD</option>
                    <option value="PHP">PHP</option>
                    <option value="SGD">SGD</option>
                    <option value="THB">THB</option>
                    <option value="ZAR">ZAR</option>
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
                    <option value="USD">USD</option>
                    <option value="JPY">JPY</option>
                    <option value="BGN">BGN</option>
                    <option value="CZK">CZK</option>
                    <option value="DKK">DKK</option>
                    <option value="GBP">GBP</option>
                    <option value="HUF">HUF</option>
                    <option value="PLN">PLN</option>
                    <option value="RON">RON</option>
                    <option value="SEK">SEK</option>
                    <option value="CHF">CHF</option>
                    <option value="ISK">ISK</option>
                    <option value="NOK">NOK</option>
                    <option value="HRK">HRK</option>
                    <option value="RUB">RUB</option>
                    <option value="TRY">TRY</option>
                    <option value="AUD">AUD</option>
                    <option value="BRL">BRL</option>
                    <option value="CAD">CAD</option>
                    <option value="CNY">CNY </option>
                    <option value="HKD">HKD</option>
                    <option value="IDR">IDR</option>
                    <option value="ILS">ILS</option>
                    <option value="INR">INR</option>
                    <option value="KRW">KRW </option>
                    <option value="MXN">MXN</option>
                    <option value="MYR">MYR</option>
                    <option value="NZD">NZD</option>
                    <option value="PHP">PHP</option>
                    <option value="SGD">SGD</option>
                    <option value="THB">THB</option>
                    <option value="ZAR">ZAR</option>
                    </select>
                </div>
                
                <div className="form-group">
                  <button onClick={(e) => this.submitHandler(e)} className="no-style button button-primary" type="submit">Calculate </button>
                  <button  onClick={(e) => this.resetHandler(e)} className="no-style button button-primary reset" type="submit">Reset </button>
                </div>
            </form>

            
        </div>
      </div>
    );
  }
}

export default Converter;