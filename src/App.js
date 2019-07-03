import React from 'react';
import logo from './logo.svg';
import './App.css';

const mileKilometerConvertVariable = 0.62137;
const scaleNames = {
 
 m: 'Miles',
 k: 'Kilometers'

};

function toMile(kilometer) {
  return kilometer * mileKilometerConvertVariable;
}

function toKilometer(mile) {
  return mile / mileKilometerConvertVariable;
}

function tryConvert(distance, convert) {
  const input = parseFloat(distance);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class HeaderFormat extends React.Component {
constructor(props) {
super(props);
}


render() {
return(
<h2 class="header">
  Mile/Kilometer conversion tool
</h2>
);
}

}
class Images extends React.Component {
constructor(props) {
super(props);
}


render() {
return(
<div>
  <img src="https://www.thecalculatorsite.com/images/articles/20141009-km-miles.jpg" class="imageLeft"></img>
 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVEkpQtfh9oj-3bpUEe9xa3TopVvR8Vd78yc1ADz0EzzXggm8OzA" class="imageRight"></img>
  </div>
);
}

}

class DistanceInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onDistanceChange(e.target.value);
  }

  render() {
    const distance = this.props.distance;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter distance in {scaleNames[scale]}:</legend>
        <input value={distance}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleMileChange = this.handleMileChange.bind(this);
    this.handleKilometerChange = this.handleKilometerChange.bind(this);
    this.state = {distance: '', scale: 'm'};
  }

  handleMileChange(distance) {
    this.setState({scale: 'm', distance});
  }

  handleKilometerChange(distance) {
    this.setState({scale: 'k', distance});
  }

  render() {
    const scale = this.state.scale;
    const distance = this.state.distance;
    const mile = scale === 'k' ? tryConvert(distance, toMile) : distance;
    const kilometer = scale === 'm' ? tryConvert(distance, toKilometer) : distance;

    return (
      <div>
      <HeaderFormat />
        <Images />
      <div class="inputs">
      
        <DistanceInput
          scale="m"
          distance={mile}
          onDistanceChange={this.handleMileChange} />
        <br />
        
        <DistanceInput
          scale="k"
          distance={kilometer}
          onDistanceChange={this.handleKilometerChange} />
        </div>
      </div>
    );
  }
}



export default Calculator;
