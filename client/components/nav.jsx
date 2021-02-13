import React from "react"

export default class Nav extends React.Component{
  constructor(props){
    super(props)
    this.state={}
  }

  render(){
    return (
      this.props.user ===null
        ? <></>
        : <div className="fixed-top">
            <nav className="navbar navbar-dark bg-dark border-0">
              <button className="navbar-toggler nav-button border-dark" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="icofont-navigation-menu"></i>
              </button>
            </nav>
            <div className="collapse position-relative" id="navbarToggleExternalContent">
              <i className="fas fa-sign-out-alt" onClick={this.props.handleLogout}></i>
              <div className="bg-dark p-4 pb-5">
                <a href="#" className="text-decoration-none"><h5 className="text-white h4 nav-links">Home</h5></a>
                <a href="#routines" className="text-decoration-none"><h5 className="text-white h4 nav-links">Routines</h5></a>
                <a href="#favorites" className="text-decoration-none"><h5 className="text-white h4 nav-links">Favorites</h5></a>
                <a href="#stopwatch" className="text-decoration-none"><h5 className="text-white h4 nav-links">Stopwatch</h5></a>
                <a href="#quote" className="text-decoration-none"><h5 className="text-white h4 nav-links">Quote</h5></a>
              </div>
              <div className="username-greeting">
                <h4>{`Hello, ${this.props.user.username}!`}</h4>
              </div>
              <i className="icofont-muscle"></i>
            </div>
          </div>
    )
  }
}
