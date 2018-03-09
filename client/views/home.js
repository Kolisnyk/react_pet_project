import React from 'react';

import style from './style.css';

export default class Home extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        error: null,
        user: null,
        userName: '',
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      console.log('handleChange', event);
      console.log('handleChange', this.state.username);
      this.setState({userName: event.target.userName});
    }

    handleSubmit(event) {
      console.log('handleSubmit', event);
      fetch("https://api.github.com/users/Kolisnyk")
        .then(res => res.json())
        .then(
          (result) => {
            console.log('result', result);
            this.setState({
              user: result.login
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
                <input type="text" id="userName" value={this.state.userName} onChange={this.handleChange} />
              <input type="submit" value="Search" />
            </form>
            { user ? <div><pre>{JSON.stringify(user, null, 2) }</pre></div> : null}
          </div>
        );
    }
  }
}
