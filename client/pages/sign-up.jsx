import React from "react"
import Spinner from "../components/spinner"

export default class SignUp extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: "",
      email: "",
      password: "",
      loading: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    this.setState({loading: false})
  }

  handleChange(event){
    const {name, value} =event.target
    this.setState({ [name] : value })
  }

  handleSubmit(event) {
    this.setState({loading: true})

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
    if(this.state.loading){
      return <Spinner />
    }

    return (
      <div className="container mt-0">
        <div className="header d-flex justify-content-between align-items-center">
          <i className="fas fa-arrow-left invisible"></i>
          <h2 className="m-0">Sign up</h2>
          <a className="text-dark" href="#login"><i className="fas fa-arrow-left"></i></a>
        </div>
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
