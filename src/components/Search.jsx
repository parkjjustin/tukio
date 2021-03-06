import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import Checkbox from './Checkbox.jsx';
import { connect } from 'react-redux';
import helpers from '../actions/helpers.js';
import logo from '../../public/assets/img/logo.png';

const items = [
  'Music',
  'Festivals',
  'Comedy',
  'Food'
];

class Search extends React.Component {
  constructor(props) {
    // calls the Component constructor function
    super(props);

    // the starting state of the `Search` Component
    this.state = {
      searchResults: [],
      searchRadius: "",
      searchAddress: "",
      combinedSearch: "",
      checkedBoxes: []
    };

    // used to make the keyword `this` work inside the `searchEvents` class function
    this.createCheckbox = this.createCheckbox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
  }

  componentWillMount() {
    this.selectedCheckboxes = new Set();
  }

  toggleCheckbox(label) {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    var checkboxArray = [];
    for (const checkbox of this.selectedCheckboxes) {
      console.log(checkbox, 'is selected.');
      checkboxArray.push(checkbox);
    }

    if (this.state.searchRadius != "" && this.state.searchAddress != "") {
      var newSearch = {
        searchRadius: this.state.searchRadius,
        searchAddress: this.state.searchAddress,
        checkedBoxes: checkboxArray
      }
      this.setState({
        // searchRadius: "",
        // searchAddress: "",
        combinedSearch: newSearch
      });
    }
  }

  componentDidUpdate() {
    if (this.state.combinedSearch != "") {
      console.log("This is being run");
      var searchData = this.state.combinedSearch;
      helpers.searchEvents(searchData).then(function (data) {
        this.props.setSearchResults(data);
        return this.setState({
          searchResults: data,
          combinedSearch: "",
          checkedBoxes: []
        })
      }.bind(this))
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  createCheckbox(label) {
    return (
      <Checkbox
        label={label}
        handleCheckboxChange={this.toggleCheckbox}
        key={label}
      />
    )
  }


  createCheckboxes() {
    return (
      items.map(this.createCheckbox)
    )
  }

  render() {

    return (
      <div className="search-content">
        <img id="search-component-logo" src={logo} />
        <form>
          {this.createCheckboxes()}
          <input type="text" value={this.state.searchAddress} className="address-input" name="searchAddress" placeholder="Enter Location" onChange={this.handleInputChange} />
          <input type="text" value={this.state.searchRadius} className="radius-input" name="searchRadius" placeholder="Radius In Miles" onChange={this.handleInputChange} />

          <input type="submit" onClick={this.handleSubmit} className="search-button" value="Search Events" />
        </form>
      </div>
    );
  }
};

Search.propTypes = {
  auth: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}


export default connect(mapStateToProps)(Search);
