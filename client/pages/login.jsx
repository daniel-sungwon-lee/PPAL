import React from "react"

export default class Login extends React.Component{
  constructor(props){
    super(props)
    this.state={
      email: "",
      password: ""
    }
    this.handleSubmit=this.handleSubmit.bind(this)
    this.handleEmailChange=this.handleEmailChange.bind(this)
    this.handlePassword=this.handlePassword.bind(this)
  }

  handleEmailChange(){

  }

  handlePassword(){

  }

  handleSubmit(){

  }

  render(){
    return (
      <div className="container">
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
                onChange={this.handleEmailChange} value={this.state.email} />
            </div>
            <div className="form-group d-flex flex-column">
              <label htmlFor="password">Password</label>
              <input type="password" minLength="8" required id="password" className="text-input"
               onChange={this.handlePassword} value={this.state.password}/>
            </div>
            <div className="button-outline form-submit">
              <button className="type-button submit" type="submit">Sign in</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
