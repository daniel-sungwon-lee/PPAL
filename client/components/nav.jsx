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
      <>
      {/*
        <div className="menuToggle">
          <input type="checkbox" />
          <span></span>
          <span></span>
          <span></span>
          <ul className="menu">
            <a href="#">
              <li>Home</li>
            </a>
            <a href="">
              <li>Routines</li>
            </a>
            <a href="">
              <li>Favorites</li>
            </a>
            <a href="">
              <li>Stopwatch</li>
            </a>
            <a href="">
              <li>Motivational Quote</li>
            </a>
          </ul>
        </div>
      */}
      </>
    )
  }
}
