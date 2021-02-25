import React from 'react';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      this.props.user === null
        ? <></>
        : <>
          <div className="collapse overlay" id="navbarToggleExternalContent" data-toggle="collapse" data-target="#navbarToggleExternalContent"></div>
          <div className="fixed-top">
            <nav className="navbar navbar-dark bg-dark border-0">
              <button className="navbar-toggler nav-button border-dark" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="icofont-navigation-menu"></i>
              </button>
            </nav>
            <div className="collapse position-relative border-0" id="navbarToggleExternalContent">
              <a className="text-decoration-none" onClick={() => this.props.previousExerciseId(null)}>
                <span onClick={() => this.props.previousRoutineId(null)}>
                  <i className="fas fa-sign-out-alt text-white" onClick={this.props.handleLogout}></i>
                </span>
              </a>
              <div className="bg-dark p-4 pb-5 border-0">
                <a href="#" className="text-decoration-none" onClick={() => this.props.previousExerciseId(null)}>
                  <h5 className="text-white h4 nav-links" onClick={() => this.props.previousRoutineId(null)} data-toggle="collapse" data-target="#navbarToggleExternalContent">
                    Home
                  </h5>
                </a>
                <a href="#routines" className="text-decoration-none" onClick={() => this.props.previousExerciseId(null)}>
                  <h5 className="text-white h4 nav-links" onClick={() => this.props.previousRoutineId(null)} data-toggle="collapse" data-target="#navbarToggleExternalContent">
                    Routines
                  </h5>
                </a>
                <a href="#favorites" className="text-decoration-none" onClick={() => this.props.previousExerciseId(null)}>
                  <h5 className="text-white h4 nav-links" onClick={() => this.props.previousRoutineId(null)} data-toggle="collapse" data-target="#navbarToggleExternalContent">
                    Favorites
                  </h5>
                </a>
                <a href="#stopwatch" className="text-decoration-none" onClick={() => this.props.previousExerciseId(null)}>
                  <h5 className="text-white h4 nav-links" onClick={() => this.props.previousRoutineId(null)} data-toggle="collapse" data-target="#navbarToggleExternalContent">
                    Stopwatch
                  </h5>
                </a>
                <a href="#quote" className="text-decoration-none" onClick={() => this.props.previousExerciseId(null)}>
                  <h5 className="text-white h4 nav-links" onClick={() => this.props.previousRoutineId(null)} data-toggle="collapse" data-target="#navbarToggleExternalContent">
                    Quote
                  </h5>
                </a>
              </div>
              <div className="username-greeting">
                <h4>{`Hello, ${this.props.user.username}!`}</h4>
              </div>
              <a href="#" onClick={() => this.props.previousExerciseId(null)}>
                <img src="icons/ppal.png" onClick={() => this.props.previousRoutineId(null)} className="icofont-muscle" data-toggle="collapse" data-target="#navbarToggleExternalContent" alt="PPAL logo"/>
              </a>
            </div>
          </div>
          </>
    );
  }
}
