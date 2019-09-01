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
      activeTotal: null,
      total: null,
      label: 'years'
    }
  }

  componentWillMount() {
    this._setStartingValues();
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
                  name="dateOfBirth"
                />
              </div>

              {/* Metric */}
              <div className="form-group">
                <label>Metric</label>
                <Select
                  className="select select-metric"
                  name="metric"
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
                  onChange={(event) => this._handleInputChange(event)}
                  className="form-input"
                  name="lifeExpectancy"
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

  /**
   * Sets some starting values in the component state.
   */
  _setStartingValues = () => {
    let today = new Date();
    let age = today.getFullYear() - this.state.dateOfBirth.getFullYear();

    this.setState({age: age, activeTotal: age, total: this.state.lifeExpectancy});
  }

  /** Handle regular input change. */
  _handleInputChange = event => this.setState({ [event.target.name]: event.target.value });

  /** Handle select change. */
  _handleSelectChange = value => this.setState({ metric: value });
  
  /** Handle datepicker change. */
  _handleDateChange = date => this.setState({ dateOfBirth: date });

  /**
   * Calculate the number of speckles we need to display.
   * 
   * @return {Number} total the total number of speckles.
   */
  _calculateSpeckles = () => {
    let {metric, lifeExpectancy} = this.state;
    let total = this._calculateTotal(metric.value, lifeExpectancy);

    return total;
  }

  /**
   * This will update the states and show the new life.
   */
  _showLife = () => {
    let total = this._calculateSpeckles();

    this.setState({ total: total, label: this.state.metric.value });
  }

  /**
   * This will calculate the totals for inactive and active speckles.
   */
  _calculateTotal = (metric, originalValue) => {
    let unit = null;

    switch (metric) {
      case 'months':
        unit = 12;
        break;
      case 'weeks':
        unit = 52;
        break;
      default:
        unit = 1;
        break
    }

    this._setNumberOfActiveSpeckles(this.state.age, unit);

    return originalValue * unit;
  }

  /**
   * Set the number of speckles that should be active.
   */
  _setNumberOfActiveSpeckles = (acc, value) => this.setState({activeTotal: acc * value});

  /**
   * This will display the speckle grid component if the state total is not null.
   */
  _displayGrid = () => {
    if(this.state.total !== null) {
      return (
        <SpeckleGrid
          total={this.state.total}
          age={this.state.activeTotal}
        />
      )
    }

    return null;
  }

}

export default App;
