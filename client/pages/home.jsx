import React from "react"

export default class Home extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <>
      <div className="container">
      <h2 className="text-center header">Home</h2>
        {
          this.props.types.map(type=>{
            return (
            <HomeButton key={type.id} type={type} />
            )
          })
        }
      </div>
      </>
    )
  }
}

function HomeButton(props){
  const {name} = props.type
  return (
    <div className="row">
      <div className="button-outline">
        <a href={`#${name}`}><button className="type-button">{name}</button></a>
      </div>
    </div>
  )
}
