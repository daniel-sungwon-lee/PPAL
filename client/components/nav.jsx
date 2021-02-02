import React from "react"

export default class Nav extends React.Component{
  constructor(props){
    super(props)
  }

  handleClickNav(event){
    this.setState({navClicked:true})
    event.target.className="invisible"
  }

  handleClickClose(event){
    this.setState({closeClicked:true})
  }

  render(){
    return (
      <div class="fixed-top">
        <div class="collapse" id="navbarToggleExternalContent">
          <div class="bg-dark p-4">
            <a href="#" class="text-decoration-none"><h5 class="text-white h4 nav-links">Home</h5></a>
            <a href="#routines" class="text-decoration-none"><h5 class="text-white h4 nav-links">Routines</h5></a>
            <a href="#favorites" class="text-decoration-none"><h5 class="text-white h4 nav-links">Favorites</h5></a>
            <a href="#stopwatch" class="text-decoration-none"><h5 class="text-white h4 nav-links">Stopwatch</h5></a>
            <a href="#quote" class="text-decoration-none"><h5 class="text-white h4 nav-links">Motivational Quote</h5></a>
          </div>
        </div>
        <nav class="navbar navbar-dark bg-dark">
          <button class="navbar-toggler nav-button" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </nav>
      </div>
    )
  }
}
