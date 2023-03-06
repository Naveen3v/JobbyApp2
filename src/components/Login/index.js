import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showError: false}

  submitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitFailure = errorMsg => {
    this.setState({errorMsg, showError: true})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {method: 'POST', body: JSON.stringify(userDetails)}
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  changeUsername = event => this.setState({username: event.target.value})

  changePassword = event => this.setState({password: event.target.value})

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, showError, errorMsg} = this.state
    return (
      <div className="loginCont">
        <div className="miniCont">
          <div className="imgCont">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="mainImg"
            />
          </div>
          <form className="formCont" onSubmit={this.submitForm}>
            <label htmlFor="username" className="userHeading">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              value={username}
              placeholder="Username"
              className="inputElement"
              onChange={this.changeUsername}
            />
            <label htmlFor="password" className="userHeading">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Password"
              className="inputElement"
              onChange={this.changePassword}
            />
            <button type="submit" className="loginBtn">
              Login
            </button>
            {showError && <p className="errorpara">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
