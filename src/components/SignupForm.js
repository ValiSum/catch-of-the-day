import React from 'react';
import FormErrors from './FormErrors';

const initialState = {
  email: '',
  password: '',
  repeatpassword: '',
  formErrors: {
    email: '', 
    password: '', 
    repeatpassword: ''
  },
  emailValid: false,
  passwordValid: false,
  repeatpasswordValid: false
}

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  onChangeForm = e => {
    const name = e.target.name;
    const value = e.target.value;
    
    const { formErrors, repeatpasswordValid } = this.validateField(name, value);
    this.setState({[name]: value, formErrors, repeatpasswordValid});
  }

  validateField = (fieldName, value) => {
    // Spread operator (operador de propagación)
    let { emailValid, passwordValid,repeatpasswordValid, formErrors } = {...this.state};

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        formErrors.email = emailValid ? '' : 'is not valid.'
      case 'password':
        passwordValid = value.length >= 5;
        formErrors.password = passwordValid ? '' : 'is not valid.';
        break;
      case 'repeatpassword':
        repeatpasswordValid = value == this.state.password;
        formErrors.repeatpassword = repeatpasswordValid ? '' : 'is not identic.'
        break;
      default:
        break;
    }

    return { formErrors, passwordValid, repeatpasswordValid };
  }

  onSubmit = e => {
    e.preventDefault();
    console.log("signup");
    this.props.signUp(this.state.email, this.state.password);
  }

  render() {
    return (
      <form className="auth-form signup" onSubmit={ this.onSubmit }>
        <p>Create your account</p>
        <input 
          name="email"
          type="email"
          value={ this.state.email }
          onChange={ this.onChangeForm }
          placeholder="Email" />
        <input
          name="password" 
          type="password"
          value={ this.state.password }
          onChange={ this.onChangeForm }
          placeholder="Password" />
        <input 
          name="repeatpassword"
          type="password"
          value={ this.state.repeatpassword }
          onChange={ this.onChangeForm }
          placeholder="Repeat Password" />
        <FormErrors formErrors={ this.state.formErrors } />
        <button type="submit" className="signup">Sign Up</button>
      </form>
    );
  }
}

export default SignupForm;
