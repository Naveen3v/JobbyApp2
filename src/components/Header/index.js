import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logBtn = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navCont">
      <ul className="navList">
        <Link to="/">
          <li>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="navImg"
            />
          </li>
        </Link>
        <Link to="/" className="navLink">
          <li className="nav-list">Home</li>
        </Link>
        <Link to="/jobs" className="navLink">
          <li className="nav-list">Jobs</li>
        </Link>
      </ul>
      <button type="button" className="navBtn" onClick={logBtn}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
