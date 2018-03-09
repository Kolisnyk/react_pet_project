import React from 'react';

import style from './style.css';

export default class Home extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        error: null,
        user: null,
        value: 'GitHub login',
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleSubmit(event) {
      fetch(`https://api.github.com/users/${this.state.value}`)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              user: result
            });
          },
          (error) => {
            this.setState({
              error
            });
          }
        )
      event.preventDefault();
      if (this.state.value == '') return null;
      fetch(`https://api.github.com/users/${this.state.value}`)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              user: result
            });
          },
          (error) => {
            this.setState({
              error
            });
          }
        )
    }

    render() {
      const { error, user } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else {
        return (
          <div className={style.response} id="response">
            <form onSubmit={this.handleSubmit}>
              <label>
                Get JSON:
                <textarea value={this.state.value} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
            { user ? <div><pre>{JSON.stringify(user, null, 2) }</pre></div> : null}
          </div>
        );
    }
  }
}
