import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = props => {
  const homeBtnClick = () => {
    const {history} = props
    history.replace('./jobs')
  }

  return (
    <div className="homeCont">
      <Header />
      <div className="textCont">
        <h1 className="homeHeading">Find The Job That Fits Your Life</h1>
        <p className="homePara">Millions of people are searching for jobs</p>
        <Link to="/jobs">
          <button type="button" className="homeBtn" onClick={homeBtnClick}>
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}
export default Home
