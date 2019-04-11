import React from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = this.props.fish;
  }
  removeFish = e => {
    e.preventDefault();
    console.log("Gonna remove a fish!");
    // get fish ID
    const fishId = this.props.index;
    // remove fish
    this.props.removeFish(fishId);
    
  }

  onChangeForm = e => {
    console.log("Gonna update a fish!");
    // set state [Controlled Component]
    this.setState({[e.target.name]: e.target.value}, () => {
      // get fish ID
      const fishId = this.props.index;
      // update fish
      this.props.updateFish(fishId, this.state);
    });
  }

  render() {
    return (
      <form className="fish-edit" onSubmit={ this.removeFish }>
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
        <button type="submit">Remove Item</button>
      </form>
    )
  }
}

EditFishForm.propTypes = {
  fish: PropTypes.object.isRequired,
  index: PropTypes.string.isRequired,
  removeFish: PropTypes.func.isRequired,
  updateFish: PropTypes.func.isRequired
}

export default EditFishForm;
