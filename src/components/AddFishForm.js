import React, { Component } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  name: '',
  price: '',
  status: 'available',
  desc: '',
  image: ''
};

class AddFishForm extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  createFish = e => {
    e.preventDefault();
    console.log('Gonna make some fish!');
    this.props.addFish(this.state);
    this.clearForm();
  }

  onChangeForm = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  clearForm = () => {
    this.setState(initialState);
  }

  render() {
    return (
      <form className="fish-edit" onSubmit={ this.createFish }>
        <input 
          name="name" 
          onChange={ this.onChangeForm } 
          value={ this.state.name } 
          type="text" 
          placeholder="Fish Name" />
        <input 
          name="price" 
          onChange={ this.onChangeForm } 
          value={ this.state.price } 
          type="text" 
          placeholder="Fish Price" />
        <select 
          name="status" 
          onChange={ this.onChangeForm } 
          value={ this.state.status } >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea 
          name="desc" 
          onChange={ this.onChangeForm } 
          value={ this.state.desc } 
          type="text" 
          placeholder="Fish Desc" />
        <input 
          name="image" 
          onChange={ this.onChangeForm } 
          value={ this.state.image } 
          type="text" 
          placeholder="Fish Image" />
        <button type="submit">+ Add Item</button>
      </form>
    )
  }
}

AddFishForm.propTypes = {
  addFish: PropTypes.func.isRequired
}

export default AddFishForm;
