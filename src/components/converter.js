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


  


  submitHandler = e => {
    const props = this.state
    if (props.base_currency != "" && props.base_amount != "" && props.target_currency!="") {
      e.preventDefault();
      fetch("/endpoints/convert", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(props)
      })
      .then(function(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
      })
      .then(function(response) {
          if (response.errno) {
            console.log(response);
            alert("There was an error. Please try again in a moment.");
          }
          else {
            this.setState({target_amount:response.target_amount});
           
          }
      })
      .catch(function(error) {
          console.log(error);
          alert("There was an error. Please try again in a moment.");
      });
    }
  };  

  render() {
    
    return (
      <div>
        
        <div className="container">
          <h1> Currency Conversion</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="currency">From: <span className="required">*</span></label>
                    <select onChange={ this.changeHandler} name = "base_currency"value={this.state.base_currency} required>
                   
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
                </div>
            </form>

            <div className="form-group">
                    <label htmlFor="amount">Target Amount: </label>
                    <p>{this.state.target_amount} </p>
                </div>
        </div>
      </div>
    );
  }
}

export default Converter;