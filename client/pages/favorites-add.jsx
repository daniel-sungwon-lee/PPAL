import React from 'react';
import Spinner from '../components/spinner';
import Fade from 'react-reveal/Fade';
import { scroller } from 'react-scroll/modules';

const modalTypes = [
  { id: 1, message: 'Cancel?', message2: '' },
  { id: 2, message: 'Finalize', message2: 'Selections?' }
];

export default class AddFavorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      loading: true,
      addedExercises: [],
      classN: 'fas fa-ban invisible'
    };
    this.data = {
      userId: this.props.userId,
      routineId: this.props.routineId,
      routineName: this.props.routineName
    };
    this.handlePreviousPage = this.handlePreviousPage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch(`/api/favorites/${this.data.userId}`)
      .then(res => res.json())
      .then(favorites => {
        this.setState({ favorites: favorites, loading: false });

        if (this.props.previousExId) {
          scroller.scrollTo(this.props.previousExId, {
            duration: 1000,
            smooth: true,
            delay: 0,
            offset: -164
          });
        }
      })
      .catch(() => location.reload());
  }

  handlePreviousPage(event) {
    const clickedModal = parseInt(event.target.getAttribute('id'));
    const exercisesToAdd = this.state.addedExercises;

    if (exercisesToAdd.length > 0 && clickedModal === 2) {
      for (let i = 0; i < exercisesToAdd.length; i++) {
        const reqBody = {
          routineId: this.data.routineId,
          exerciseId: exercisesToAdd[i],
          isCompleted: false
        };

        fetch('/api/routineExercises', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reqBody)
        })
          .catch(() => location.reload());
      }
      window.location.hash = `#routine?routineId=${this.data.routineId}`;
      this.props.previousExerciseId(null);

    } else {
      window.location.hash = `#routine?routineId=${this.data.routineId}`;
      this.props.previousExerciseId(null);
    }
  }

  handleClick(event) {
    this.setState({ classN: 'fas fa-check' });

    if (event.target.checked) {
      event.target.previousSibling.style.transform = 'rotate(45deg)';
      event.target.previousSibling.style.color = '#E12121';

    } else {
      event.target.previousSibling.style.transform = 'rotate(0deg)';
      event.target.previousSibling.style.color = '#28B351';
    }
  }

  handleChange(exerciseId) {
    if (event.target.checked) {
      this.state.addedExercises.push(exerciseId);

    } else {
      const newAddedExercises = this.state.addedExercises.filter(id => {
        return id !== exerciseId;
      });
      this.setState({ addedExercises: newAddedExercises });
    }
  }

  render() {
    return (
      this.state.loading
        ? <Spinner />
        : <div className="container">
            {
              modalTypes.map(modal => {
                let extraClass = '';
                if (modal.id === 2) {
                  extraClass = 'validate-modal';
                }
                return (
                  <ModalStatic key={modal.id} modal={modal} extraClass={extraClass} handlePreviousPage={this.handlePreviousPage} />
                );
              })
            }
            <div className="header d-flex justify-content-between align-items-center header-packed">
              <i className="fas fa-ban" data-toggle="modal" data-target={'#staticBackdrop1'}></i>
              <h2 className="text-center mx-2 mb-0 text-break">{`Add to ${this.data.routineName}`}</h2>
              <i className={this.state.classN} data-toggle="modal" data-target={'#staticBackdrop2'}></i>
            </div>
            <>
            {
              this.props.types.map(type => {
                return (
                  <ExerciseTypeHeader key={type.id} name={type.name}
                    favorites={this.state.favorites}
                    previousHash={this.props.previousHash}
                    handleClick={this.handleClick}
                    handleChange={this.handleChange} />
                );
              })
            }
            </>
          </div>
    );
  }
}

function ExerciseTypeHeader(props) {
  return (
    <>
      <Fade bottom>
        <div className="d-flex justify-content-start m-4">
          <div className="type-header d-flex align-items-center justify-content-center">
            <div className="w-100">
              <h3 className="m-0 pl-4">{props.name}</h3>
            </div>
          </div>
        </div>
      </Fade>
      <Fade bottom>
        {
          props.favorites.map(exercise => {
            if (exercise.type === props.name) {
              return (
                <Exercise key={exercise.exerciseId}
                  exercise={exercise}
                  handleChange={() => props.handleChange(exercise.exerciseId)}
                  handleClick={props.handleClick}
                  previousHash={props.previousHash} />
              );
            } else {
              return '';
            }
          })
        }
      </Fade>
    </>
  );
}

function Exercise(props) {
  const { exerciseId, name } = props.exercise;
  return (
    <>
      <div id={exerciseId} className="favorites-exercise-row d-flex justify-content-between align-items-center mb-5">
        <a className="w-75 text-decoration-none text-dark"
          href={`#favoritesExercise?exerciseId=${exerciseId}`}
          onClick={() => props.previousHash(window.location.hash)}>
          <div className="row row-exercise m-0">
            <button className="h4 exercise-name">{name}</button>
          </div>
        </a>
        <label className="fas fa-plus favs-add" htmlFor={`check${exerciseId}`} style={{ transform: 'rotate(0deg)' }}></label>
        <input id={`check${exerciseId}`}
           className="d-none"
           type="checkbox"
           onClick={props.handleClick}
           onChange={props.handleChange} />
      </div>
    </>
  );
}

function ModalStatic(props) {
  const { id, message, message2 } = props.modal;
  return (
    <div className="modal fade" id={`staticBackdrop${id}`} data-backdrop="static" data-keyboard="false" aria-labelledby={`staticBackdrop${id}Label`} aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header m-0 align-items-center">
            <div className="modal-title" id={`staticBackdrop${id}Label`}>
              <h4 className="m-0">{message}</h4>
              <h4 className="m-0">{message2}</h4>
            </div>
            <div className="modal-icons d-flex align-items-center">
              <i className={`fas fa-hand-point-left ${props.extraClass}`} data-dismiss="modal" aria-label="Close"></i>
              <i className={`fas fa-thumbs-up ${props.extraClass}`} id={id} data-dismiss="modal" aria-label="Close" onClick={props.handlePreviousPage}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
