import React, {Component} from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { AppHeader } from './components/app-header/AppHeader';

import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import { SpeckleGrid } from './components/speckle-grid/SpeckleGrid';

const metricOptions = [
  // {value: 'days', label: 'Days'},
  {value: 'weeks', label: 'Weeks'},
  {value: 'months', label: 'Months'},
  {value: 'years', label: 'Years'}
]

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateOfBirth: new Date("1993/08/19"),
      metric: { value: "years", label: "Years" },
      lifeExpectancy: 80,
      age: null,
      inactiveTotal: null,
      total: null,
      label: 'years'
    }
  }

  componentWillMount() {
    this._setStartingAge();
  }

  render() {
    const { dateOfBirth, metric, lifeExpectancy } = this.state;

    return (
      <div className="app">
        <AppHeader
          title="⚰️ Lifetime"
          subtitle="See how much time you have left to live."
        />
        <div className="app-main">
          <div id="app-form" className="app-column">
            <form className="form">

              {/* Date of Birth */}
              <div className="form-group">
                <label>Date of Birth</label>
                <DatePicker
                  selected={dateOfBirth}
                  onChange={this._handleDateChange}
                  className="form-input"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              </div>

              {/* Metric */}
              <div className="form-group">
                <label>Metric</label>
                <Select
                  className="select select-metric"
                  value={metric}
                  onChange={this._handleSelectChange}
                  options={metricOptions}
                  theme={theme => ({
                    ...theme,
                    colors: {
                      ...theme.colors,
                      primary25: '#47d4d92c',
                      primary: '#47d4d9'
                    },
                  })}
                />
              </div>

              {/* Life Expectancy */}
              <div className="form-group">
                <label>Life Expectancy</label>
                <input
                  value={lifeExpectancy}
                  onChange={(event) => this._handleChange(event)}
                  className="form-input"
                  type="number"
                />
              </div>

              <button type="button" className="button button--blue" onClick={this._showLife}>Show me!</button>

            </form>
          </div>
          <div id="app-data" className="app-column">
            <h3>Your life in <span className="highlight">{this.state.label}</span></h3>
            {this._displayGrid()}
          </div>
        </div>
      </div>
    );
  }

  _setStartingAge = () => {
    let today = new Date();
    let age = today.getFullYear() - this.state.dateOfBirth.getFullYear();

    this.setState({age: age, inactiveTotal: age, total: this.state.lifeExpectancy});
  }

  _handleChange = event => {
    this.setState({ lifeExpectancy: event.target.value })
  }

  _handleSelectChange = value => {
    this.setState({ metric: value });
  }

  _handleDateChange = date => {
    this.setState({
      dateOfBirth: date
    });
  };

  _calculateSpeckles = () => {
    let {metric, lifeExpectancy} = this.state;
    let total = this._calculateTotal(metric.value, lifeExpectancy);

    return total;
  }

  _showLife = () => {
    let total = this._calculateSpeckles();

    this.setState({ total: total, label: this.state.metric.value });
  }

  _calculateTotal = (metric, originalValue) => {
    let calculation = null;

    switch (metric) {
      case 'months':
        calculation = originalValue * 12;
        this.setState({inactiveTotal: this.state.age * 12});
        break;
      case 'weeks':
        calculation = originalValue * 52;
        this.setState({inactiveTotal: this.state.age * 52 });
        break;
      default:
        calculation = originalValue;
        this.setState({ inactiveTotal: this.state.age });
        break
    }

    return calculation;
  }

  _displayGrid = () => {
    if(this.state.total !== null) {
      return (
        <SpeckleGrid
          total={this.state.total}
          age={this.state.inactiveTotal}
        />
      )
    }

    return null;
  }

}

export default App;
