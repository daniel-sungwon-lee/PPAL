import React from 'react';

export default class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { start: false, counter: 0 };
    this.tick = this.tick.bind(this);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.clear = this.clear.bind(this);
  }

  tick() {
    this.setState({ counter: this.state.counter + 1 });
  }

  play() {
    this.setState({ start: true });
    this.timer = setInterval(() => this.tick(), 1000);
  }

  pause() {
    clearInterval(this.timer);
    this.setState({ start: false });
  }

  clear() {
    this.setState({ counter: 0 });
  }

  render() {
    let seconds = this.state.counter;
    let minutes = Math.floor(seconds / 60);

    seconds -= (60 * minutes);

    seconds = seconds.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');

    const timer = `${minutes}:${seconds} `;

    return (
      <div className="container">
        <h2 className="text-center header">Stopwatch</h2>
        {
          this.state.start
            ? <div className="row-watch">
                <div className="watch">
                  <h1 className="m-0 timer">{timer}</h1>
                </div>
                <i onClick={this.pause} className="fas fa-pause"></i>
              </div>
            : <div className="row-watch">
                <div onClick={this.clear} className="watch" style={{ cursor: 'pointer' }}>
                  <h1 className="m-0 timer">{timer}</h1>
                </div>
                <i onClick={this.play} className="fas fa-play"></i>
              </div>
        }
      </div>
    );
  }
}
