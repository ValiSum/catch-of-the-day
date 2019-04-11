import React from 'react';
import PropTypes from 'prop-types';
import base, { firebaseApp } from '../base';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import EditFishForm from './EditFishForm';
import AddFishForm from './AddFishForm';


const initialState = {
  uid: null,
  owner: null
};

class Inventory extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  authHandler = async authData => {
    // 1. Look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, { context: this });
    console.log(store);
    // 2. Claim it if there is no owner
    if (!store.owner) {
      // save it as our own
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      })
    }
    // 3. Set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
  };

  signUp = async (email, password) => {

    // 1. Look up the current store in the firebase database
    const store = await base.fetch(this.props.storeId, { context: this });
    console.log(store);
    // 2. Claim it if there is no owner

    //firebaseApp.auth().createUserWithEmailAndPassword(email, password)
    //.then( this.authHandler )
  };

  render() {
    // check if we are not logged in at all
    // if (!this.state.uid) {
    //   return (
    //     <div>
    //       <LoginForm />
    //       <SignupForm signUp={ this.signUp } />
    //     </div>
    //   );
    // }

    // // check if we are the owner of the current store
    // if (this.state.uid !== this.state.owner) {
    //   return (
    //     <div>
    //       <p>Sorry you aren't the owner of this store!</p>
    //     </div>
    //   );
    // }


    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes)
          .map(key => <EditFishForm 
            key={ key }
            index={ key }
            fish={ this.props.fishes[key] }
            updateFish={ this.props.updateFish }
            removeFish={ this.props.removeFish } />
        )}
        <AddFishForm addFish={ this.props.addFish } />
        <button onClick={ this.props.loadSamples }>Load Sample Fishes</button>
      </div>
      
    )
  }
}

Inventory.propTypes = {
  addFish: PropTypes.func.isRequired,
  fishes: PropTypes.object.isRequired,
  loadSamples: PropTypes.func.isRequired,
  removeFish: PropTypes.func.isRequired,
  updateFish: PropTypes.func.isRequired,
  storeId: PropTypes.string.isRequired
}

export default Inventory;