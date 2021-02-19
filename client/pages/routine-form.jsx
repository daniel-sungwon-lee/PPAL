import React from 'react';
import Spinner from '../components/spinner';

function ModalStatic(props) {
  return (
    <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header m-0 align-items-center">
            <div className="modal-title" id="staticBackdropLabel">
              <h4 className="">Cancel?</h4>
              <h4 className="">All data will be lost</h4>
            </div>
            <div className="modal-icons d-flex align-items-center">
              <i className="fas fa-hand-point-left" data-dismiss="modal" aria-label="Close"></i>
              <i className="fas fa-thumbs-up" data-dismiss="modal" aria-label="Close" onClick={props.handleCancel}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default class RoutineForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      day: '',
      description: '',
      loading: true
    };
    this.data = {
      userId: this.props.userId,
      type: `${this.props.type} Routine`,
      routineId: this.props.routineId
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    if (this.data.type === 'new Routine') {
      return this.setState({ loading: false });
    }

    fetch(`/api/routine/${this.data.routineId}`)
      .then(res => res.json())
      .then(routine => {
        const { name, day, description } = routine;
        this.setState({ name, day, description, loading: false });
      })
      .catch(() => location.reload());
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleCancel() {
    window.location.hash = '#routines';
  }

  handleSubmit(event) {
    this.setState({ loading: true });

    event.preventDefault();
    const name = this.state.name;
    const day = this.state.day;
    const description = this.state.description;
    const userId = this.data.userId;
    const reqBody = { name, day, description, userId };

    if (this.data.type === 'new Routine') {
      fetch('/api/routines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody)
      })
        .then(res => res.json())
        .then(result => {
          window.location.hash = '#routines';
        })
        .catch(() => location.reload());

    } else if (this.data.type === 'edit Routine') {
      fetch(`/api/routines/${this.data.routineId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody)
      })
        .then(result => {
          window.location.hash = '#routines';
        })
        .catch(() => location.reload());
    }
  }

  render() {
    return (
      this.state.loading
        ? <Spinner />
        : <div className="container">
            <ModalStatic handleCancel={this.handleCancel} />
            <div className="header d-flex justify-content-between align-items-center">
              <i className="fas fa-ban invisible"></i>
              <h2 className="text-uppercase m-0">{this.data.type}</h2>
              <i className="fas fa-ban" data-toggle="modal" data-target="#staticBackdrop"></i>
            </div>
            <form className="form" onSubmit={this.handleSubmit}>
              <div className="form-group d-flex flex-column input-div">
                <label htmlFor="routineName">Routine name</label>
                <input type="text" className="text-input" id="routineName" required
                 placeholder="Push" onChange={this.handleChange} name="name" value={this.state.name}/>
              </div>
              <div className="form-group d-flex flex-column input-div">
                <label htmlFor="routineDay">Day of the week</label>
                <select required value={this.state.day} className="select" id="routineDay" name="day" onChange={this.handleChange}>
                  <option disabled hidden value="">Pick a day</option>
                  <option>Sunday</option>
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                </select>
              </div>
              <div className="form-group d-flex flex-column">
                <label htmlFor="routineDescription">Routine description</label>
                <textarea className="textarea" id="routineDescription" required placeholder="Chest and triceps workout"
                 onChange={this.handleChange} name="description" value={this.state.description}></textarea>
              </div>
              <div className="button-outline form-submit">
                <button className="type-button submit" type="submit">Save</button>
              </div>
            </form>
          </div>
    );
  }
}
