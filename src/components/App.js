import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
  constructor() {
    super();
    // getinitialState
    this.state = {
      fishes: {},
      order: {}
    };
  }

  componentDidMount() {
    const { params } = this.props.match;
    
    // this runs right before the <App> is rendered
    this.ref = base.syncState(`${ params.storeId }/fishes`, {
      context: this,
      state: "fishes"
    });

    // check if there is any order in localStorage
    const localStorageRef = localStorage.getItem(`order-${ params.storeId }`);
    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentDidUpdate() {
    const { params } = this.props.match;
    localStorage.setItem(`order-${ params.storeId }`, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // we spread the state
    const fishes = {...this.state.fishes};
    // add in our new fish
    const timestamp = Date.now();
    fishes[`fish-${ timestamp }`] = fish;
    // set state
    this.setState({ fishes });
  }

  updateFish = (fishId,fish) => {
    // we spread the state
    const fishes = {...this.state.fishes};
    // update fish
    fishes[fishId] = fish;
    // set state
    this.setState({ fishes });
  }

  removeFish = fishId => {
    // we spread the state
    const fishes = {...this.state.fishes};
    //remove fish
    fishes[fishId] = null;
    // set state
    this.setState({ fishes });
  }

  loadSamples = () => {
    this.setState({
      fishes: sampleFishes
    });
  }

  addToOrder = key => {
    // take a copy of our state (we spread the state)
    const order = {...this.state.order};
    // update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1;
    // update our state
    this.setState({ order });
  }

  removeFromOrder = key => {
    // we spread the state
    const order = {...this.state.order}
    //remove order
    delete order[key];
    // set state
    this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {
              Object.keys(this.state.fishes)
              .map(key => <Fish 
                key={ key }
                index={ key } 
                details={ this.state.fishes[key] }  
                addToOrder={ this.addToOrder }  />
              )
            }
          </ul>
        </div>
        <Order
          fishes={ this.state.fishes }
          order={ this.state.order }
          removeFromOrder={ this.removeFromOrder } />
        <Inventory 
          addFish={ this.addFish }
          updateFish={ this.updateFish }
          removeFish={ this.removeFish }
          loadSamples={ this.loadSamples }
          fishes={ this.state.fishes }
          storeId={ this.props.match.params.storeId } />
      </div>
    )
  }
}

export default App;
