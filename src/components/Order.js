import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends React.Component {
  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const transitionOptions = {
      classNames: "order",
      key,
      timeout: { enter: 500, exit: 500 }
    };
    const removeButton = <button onClick={ () => this.props.removeFromOrder(key) }>&times;</button>
    

    if (!fish || fish.status === 'unavailable') {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={ key }>
            Sorry, {fish ? fish.name : 'fish'} is no longer available! { removeButton }
          </li>
          </CSSTransition>
      )
    }

    return (
      <CSSTransition {...transitionOptions}>
        <li key={ key }>
          <TransitionGroup component="span" className="count">
            <CSSTransition classNames="count" key={count} timeout={{enter: 500, exit: 500}}>
              <span>{ count }</span>
            </CSSTransition>
          </TransitionGroup>
          lbs { fish.name }
          <span className="price">{ formatPrice(count * fish.price) }</span>
          { removeButton }
        </li>
      </CSSTransition>
    )
  }
  
  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === 'available';
      if (isAvailable) {
        return prevTotal + (count * fish.price || 0);
      }
      return prevTotal;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <TransitionGroup className="order" component="ul">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
            Total:
            <strong>{ formatPrice(total) }</strong>
          </div>
      </div>
    )
  }
}

Order.propTypes = {
  fishes: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  removeFromOrder: PropTypes.func.isRequired
}

export default Order;
