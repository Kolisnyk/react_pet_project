import React from 'react';
import classNames from 'classnames';

// import style from './styles.scss';

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
      this.setState({userName: event.target.userName});
    }

    handleSubmit(event) {
      fetch("https://api.github.com/users/" + this.state.userName)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              user: result.user
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
          <div className={classNames('form')} id="response">
            <form onSubmit={this.handleSubmit}>
                <input type="text" id="username-input" value={this.state.userName} onChange={this.handleChange} />
              <input type="submit" value="Search" />
            </form>
            { user ? <div><pre>{JSON.stringify(user, null, 2) }</pre></div> : null}
          </div>
        );
    }
  }
}
