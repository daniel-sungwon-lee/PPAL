import React from "react"

export default class Favorites extends React.Component{
  constructor(props){
    super(props)
    this.state={}
  }

  componentDidMount(){

  }

  render(){
    return (
      <div className="container">
        <div className="header d-flex justify-content-between align-items-center">
          <i className="fas fa-plus invisible"></i>
          <h2 className="text-uppercase m-0">Favorites</h2>
          <i className="fas fa-plus"></i>
        </div>
      </div>
    )
  }
}
