import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  state = {
      off: true,
      work: false,
      rest: false,
      min: 20,
      sec: 0,
      timer: null,
  }

    startTimer = () => {
      this.setState({timer: setInterval(this.step,1000)});
    }

    stopTimer = () => {
      clearInterval(this.state.timer);
    }

    step = () => {
        if (this.state.min === 0 && this.state.sec === 0) {
            this.setState({work:!this.state.work, rest: !this.state.rest});
            this.playBell();
            if (this.state.work) {
                this.setState({min: 20, sec: 0});
            }
            if (this.state.rest) {
                this.setState({min: 0, sec: 20});
            }
        } else {
            if (this.state.sec === 0) {
                this.setState({min: this.state.min-1})
                this.setState({sec: 59})
            } else {
                this.setState({sec: this.state.sec - 1})
            }
        }
    }

  handleButton = () => {
      this.setState({off: false, work: true});
      this.startTimer();
  }

  handleStop = () => {
      this.stopTimer();
      this.setState({
          off: true,
          work: false,
          rest: false,
          min: 20,
          sec: 0,
      });
  }

  playBell = () => {
      const audio = new Audio('./sounds/bell.wav');
      audio.play();
  }

  closeApp = () => {
    window.close()
  }

  render() {
      const {off, work, rest, min, sec} = this.state;
    return (
      <div>
        <h1>Protect your eyes</h1>
        {off &&
            <div>
                <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
                <p>This app will help you track your time and inform you when it's time to rest.</p>
                <button
                    className="btn"
                    onClick={()=> this.handleButton()}
                >
                    Start
                </button>
            </div>
        }
        {work &&
            <div>
                <img src="./images/Work.png" alt='work_picture'/>
                <div className="timer">
                    {`${('0' + min).slice(-2)}:${('0' + sec).slice(-2)}`}
                </div>
                <button
                    className="btn"
                    onClick={this.handleStop}
                >
                    Stop
                </button>
            </div>
        }
        {rest &&
            <div>
                <img src="./images/Rest.png" alt='rest_picture'/>
                <div className="timer">
                    {`${('0' + min).slice(-2)}:${('0' + sec).slice(-2)}`}
                </div>
                <button
                    className="btn"
                    onClick={this.handleStop}
                >
                    Stop
                </button>
            </div>
        }
        <button className="btn btn-close" onClick={this.closeApp}>X</button>
      </div>
    )
  }
}

render(<App />, document.querySelector('#app'));
