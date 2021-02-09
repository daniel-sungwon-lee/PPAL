import React from "react"

export default class SignUp extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: "",
      email: "",
      password: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event){
    const {name, value} =event.target
    this.setState({ [name] : value })
  }

  handleSubmit(event) {
    event.preventDefault()
    const reqBody =this.state

    fetch("/api/signUp", {
      method: "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify(reqBody)
    })
      .then(result=>{
        window.location.hash="#login"
      })
  }

  render(){
    return (
      <div className="container">
        <h2 className="header text-center">Sign up</h2>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form-group d-flex flex-column input-div">
            <label htmlFor="username">Username</label>
            <input type="text" className="text-input" id="username" required
              onChange={this.handleChange} name="username" value={this.state.username} />
          </div>
          <div className="form-group d-flex flex-column input-div">
            <label htmlFor="email">Email</label>
            <input type="email" className="text-input" id="email" required
              onChange={this.handleChange} name="email" value={this.state.email} />
          </div>
          <div className="form-group d-flex flex-column">
            <label htmlFor="password">Password</label>
            <input type="password" minLength="8" required id="password" className="text-input"
              onChange={this.handleChange} name="password" value={this.state.password} />
          </div>
          <div className="button-outline form-submit auth-button">
            <button className="type-button submit" type="submit">Sign up</button>
          </div>
        </form>
      </div>
    )
  }
}
