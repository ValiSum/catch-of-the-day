import React from 'react';

class LoginForm extends React.Component {
  render() {
    return (
      <form className="auth-form login">
        <p>Log in to manage your store's inventory</p>
        <input type="email" className="email" placeholder="Email" />
        <input type="password" className="password" placeholder="Password" />
        <span className="error">Error message</span>
        <button type="submit" className="login">Log In</button>
      </form>
    );
  }
}

export default LoginForm;