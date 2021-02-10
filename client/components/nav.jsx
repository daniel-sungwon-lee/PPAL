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
            <div className="collapse" id="navbarToggleExternalContent">
              <div className="bg-dark p-4">
                <a href="#" className="text-decoration-none"><h5 className="text-white h4 nav-links">Home</h5></a>
                <a href="#routines" className="text-decoration-none"><h5 className="text-white h4 nav-links">Routines</h5></a>
                <a href="#favorites" className="text-decoration-none"><h5 className="text-white h4 nav-links">Favorites</h5></a>
                <a href="#stopwatch" className="text-decoration-none"><h5 className="text-white h4 nav-links">Stopwatch</h5></a>
                <a href="#quote" className="text-decoration-none"><h5 className="text-white h4 nav-links">Motivational Quote</h5></a>
              </div>
              <i className="fas fa-sign-out-alt" onClick={this.props.handleLogout}></i>
            </div>
            <nav className="navbar navbar-dark bg-dark">
              <button className="navbar-toggler nav-button" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </nav>
          </div>
    )
  }
}
