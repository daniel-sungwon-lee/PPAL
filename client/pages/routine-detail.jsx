import React from 'react';
import Spinner from '../components/spinner';
import Fade from 'react-reveal/Fade';
import { scroller } from 'react-scroll/modules';

export default class RoutineDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: [],
      loading: true
    };
    this.data = {
      userId: this.props.userId,
      routineId: this.props.routineId,
      routine: {},
      routineExercises: []
    };
    this.deleteRoutineExercise = this.deleteRoutineExercise.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch(`/api/routine/${this.data.routineId}`)
      .then(res => res.json())
      .then(routine => {
        this.data.routine = routine;

        fetch(`/api/routineExercises/${this.data.userId}/${this.data.routineId}`)
          .then(res => res.json())
          .then(data => {
            this.setState({ exercises: data, loading: false });

            if (this.props.previousExId) {
              scroller.scrollTo(this.props.previousExId, {
                duration: 1000,
                smooth: true,
                delay: 0,
                offset: -94
              });
            }
          })
          .catch(() => location.reload());
      })
      .catch(() => location.reload());

  }

  deleteRoutineExercise(exerciseId) {
    const newExercises = this.state.exercises.filter(exercise => {
      return exercise.exerciseId !== exerciseId;
    });

    this.setState({ exercises: newExercises });

    fetch(`/api/routineExercises/${this.data.routineId}/${exerciseId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .catch(() => location.reload());
  }

  handleChange(exerciseId) {
    if (event.target.checked) {
      event.target.previousSibling.className = 'fas fa-check-square mr-4 mb-0';

      const reqBody = { isCompleted: true };
      fetch(`/api/routineExercises/${this.data.routineId}/${exerciseId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody)
      })
        .then(res => res.json())
        .then(updatedExercise => {
          fetch(`/api/routineExercises/${this.data.userId}/${updatedExercise.routineId}`)
            .then(res => res.json())
            .then(data => {
              this.setState({ exercises: data });
            })
            .catch(() => location.reload());
        })
        .catch(() => location.reload());

    } else {
      event.target.previousSibling.className = 'far fa-square mr-4 mb-0';

      const reqBody = { isCompleted: false };
      fetch(`/api/routineExercises/${this.data.routineId}/${exerciseId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody)
      })
        .then(res => res.json())
        .then(updatedExercise => {
          fetch(`/api/routineExercises/${this.data.userId}/${updatedExercise.routineId}`)
            .then(res => res.json())
            .then(data => {
              this.setState({ exercises: data });
            })
            .catch(() => location.reload());
        })
        .catch(() => location.reload());

    }
  }

  render() {
    return (
      this.state.loading
        ? <Spinner />
        : <div className="container">
            <Modal description={this.data.routine.description}/>
            <div className="header d-flex justify-content-between align-items-center header-packed">
              <a className="text-dark" href="#routines" onClick={() => this.props.previousRoutineId(this.data.routineId)}>
                <i onClick={() => this.props.previousExerciseId(null)} className="fas fa-arrow-left"></i>
              </a>
              <h2 className="text-center m-0 mx-2 text-break" role="button" data-toggle="modal" data-target="#saveModal">{this.data.routine.name}</h2>
              <a className="text-dark" href={`#favoritesAdd?routineId=${this.data.routineId}&routineName=${this.data.routine.name}`}>
                <i className="fas fa-plus" onClick={() => this.props.previousExerciseId(null)}></i>
              </a>
            </div>
            <div className="m-auto routine-exercises-column">
              {
                this.state.exercises.map(exercise => {
                  let checkLabelClass = 'far fa-square mr-4 mb-0';
                  let buttonClass = 'h4 exercise-name';

                  if (exercise.isCompleted) {
                    checkLabelClass = 'fas fa-check-square mr-4 mb-0';
                    buttonClass = 'h4 exercise-name is-completed';
                  }

                  return (
                    <Exercise key={exercise.exerciseId} exercise={exercise} checkLabelClass={checkLabelClass}
                     previousHash={this.props.previousHash} deleteRoutineExercise={this.deleteRoutineExercise}
                     handleChange={() => this.handleChange(exercise.exerciseId)} buttonClass={buttonClass} />
                  );
                })
              }
            </div>
          </div>
    );
  }
}

function Exercise(props) {
  const { exerciseId, name, isCompleted } = props.exercise;
  return (
    <div id={exerciseId} className="d-flex mb-5 align-items-center">
      <Fade bottom>
        <label className={props.checkLabelClass} htmlFor={`check${exerciseId}`}></label>
        <input type="checkbox" id={`check${exerciseId}`}
          className="d-none" checked={isCompleted}
          onChange={props.handleChange}/>
        <a className="text-decoration-none text-dark w-100"
          href={`#favoritesExercise?exerciseId=${exerciseId}`}
          onClick={() => props.previousHash(window.location.hash)}>
          <div className="row row-exercise mb-0">
            <button className={props.buttonClass}>{name}</button>
          </div>
        </a>
        <i className="fas fa-trash ml-4" data-toggle="modal" data-target={`#staticBackdrop${exerciseId}`}></i>
      </Fade>
      <ModalStatic key={exerciseId} deleteRoutineExercise={() => props.deleteRoutineExercise(exerciseId)} id={exerciseId} />
    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal fade" id="saveModal" role="dialog">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header m-0">
            <h4 className="modal-title" id="exampleModalLabel">{props.description}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalStatic(props) {
  return (
    <div className="modal fade" id={`staticBackdrop${props.id}`} data-backdrop="static" data-keyboard="false" aria-labelledby={`staticBackdrop${props.id}Label`} aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header m-0 align-items-center">
            <div className="modal-title" id={`staticBackdrop${props.id}Label`}>
              <h4 className="">Delete?</h4>
              <h4 className="">There is no going back...</h4>
            </div>
            <div className="modal-icons d-flex align-items-center">
              <i className="fas fa-hand-point-left" data-dismiss="modal" aria-label="Close"></i>
              <i className="fas fa-thumbs-up" data-dismiss="modal" aria-label="Close" onClick={props.deleteRoutineExercise}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
