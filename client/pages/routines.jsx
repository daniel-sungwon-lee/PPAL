import React from "react"

export default class Routines extends React.Component{
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
          <h2 className="text-uppercase m-0">Routines</h2>
          <a className="text-dark" href="#"><i className="fas fa-plus"></i></a>
        </div>

        <div className="accordion" id="accordionExample">
          <div className="card">
            <div className="card-header" id="headingOne">
              <h2 className="mb-0">
                <button className="accordion-button btn btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  Sunday
                </button>
              </h2>
            </div>
            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
              <div className="card-body">
                {

                }
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header" id="headingTwo">
              <h2 className="mb-0">
                <button className="accordion-button btn btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Monday
                </button>
              </h2>
            </div>
            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
              <div className="card-body">
                {

                }
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header" id="headingThree">
              <h2 className="mb-0">
                <button className="accordion-button btn btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Tuesday
                </button>
              </h2>
            </div>
            <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
              <div className="card-body">
                {

                }
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header" id="headingFour">
              <h2 className="mb-0">
                <button className="accordion-button btn btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                  Wednesday
                </button>
              </h2>
            </div>
            <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
              <div className="card-body">
                {

                }
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header" id="headingFive">
              <h2 className="mb-0">
                <button className="accordion-button btn btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                  Thursday
                </button>
              </h2>
            </div>
            <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
              <div className="card-body">
                {

                }
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header" id="headingSix">
              <h2 className="mb-0">
                <button className="accordion-button btn btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                  Friday
                </button>
              </h2>
            </div>
            <div id="collapseSix" className="collapse" aria-labelledby="headingSix" data-parent="#accordionExample">
              <div className="card-body">
                {

                }
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header" id="headingSeven">
              <h2 className="mb-0">
                <button className="accordion-button btn btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                  Saturday
                </button>
              </h2>
            </div>
            <div id="collapseSeven" className="collapse" aria-labelledby="headingSeven" data-parent="#accordionExample">
              <div className="card-body">
                {

                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
