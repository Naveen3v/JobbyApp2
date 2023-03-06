import './index.css'

const NotFound = () => (
  <div className="nfCont">
    <h1>Page Not Found</h1>
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="nfImg"
    />
    <p className="nfpara">
      we're sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
