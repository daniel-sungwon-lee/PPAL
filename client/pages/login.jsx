import React from 'react';
import Spinner from '../components/spinner';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.autoFill = this.autoFill.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    this.setState({ loading: true });

    event.preventDefault();
    const reqBody = this.state;

    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqBody)
    })
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          this.setState({ loading: false });
          setTimeout(() => alert(result.error), 33);
        }
        if (result.token && result.user) {
          this.props.handleLogin(result);
        }
      });
  }

  autoFill() {
    this.setState({ email: 'demo@User', password: 'demoUser3' });
  }

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }

    return (
      <div className="container mt-0">
        <div className="text-center header">
          <h1>PPAL</h1>
        </div>
        <div>
          <div className="ml-4">
            <h2 className="m-0">Welcome,</h2>
            <h2>Please sign in</h2>
          </div>
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form-group d-flex flex-column input-div">
              <label htmlFor="email">Email</label>
              <input type="email" className="text-input" id="email" required
                onChange={this.handleChange} name="email" value={this.state.email}/>
            </div>
            <div className="form-group d-flex flex-column">
              <label htmlFor="password">Password</label>
              <input type="password" minLength="8" required id="password" className="text-input"
               onChange={this.handleChange} name="password" value={this.state.password}/>
            </div>
            <div className="button-outline form-submit auth-button">
              <button className="type-button submit" type="submit">Sign in</button>
            </div>
          </form>
          <div className="ml-4">
            <h2>First time?</h2>
            <div className="button-outline m-3">
              <a href="#signUp"><button className="type-button">Sign up</button></a>
            </div>
          </div>
          <div className="mt-4 ml-4 h5">
            <a className="text-decoration-none demo-link" role="button" onClick={this.autoFill}>Click here if you don&apos;t like signing up</a>
          </div>
        </div>
      </div>
    );
  }
}
