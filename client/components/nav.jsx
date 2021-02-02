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
            <h5 class="text-white h4">Collapsed content</h5>
            <span class="text-muted">Toggleable via the navbar brand.</span>
          </div>
        </div>
        <nav class="navbar navbar-dark bg-dark">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </nav>
      </div>
    )
  }
}
