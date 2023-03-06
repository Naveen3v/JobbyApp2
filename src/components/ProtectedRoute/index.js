import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

import Home from '../Home'
import Jobs from '../Jobs'
import JobItemDetails from '../JobItemDetails'

const ProtectedRoute = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}
export default ProtectedRoute
