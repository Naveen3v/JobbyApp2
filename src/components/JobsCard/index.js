import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

const JobsCard = props => {
  const {jobDetails} = props
  const {
    location,
    companyLogoUrl,
    employmentType,
    jobDescription,
    id,
    rating,
    title,
    packagePerAnnum,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="jclink">
      <li className="jcList">
        <div className="jcimgCont">
          <img src={companyLogoUrl} className="jcImg" alt="company logo" />
          <div className="jcimgText">
            <h1 className="jcimgHeading">{title}</h1>
            <div className="jcimgRating">
              <AiFillStar className="jcStar" />
              <p className="jcimgPara">{rating}</p>
            </div>
            <div className="jcloc">
              <div className="jclocleft">
                <GoLocation className="jcLocationImg" />
                <p className="jcimgPara">{location}</p>
                <BsBriefcaseFill className="jcLocationImg" />
                <p className="jcimgPara">{employmentType}</p>
              </div>
              <div className="jclocright">
                <p className="jcimgPara">{packagePerAnnum}</p>
              </div>
            </div>
          </div>
        </div>
        <hr className="jcline" />
        <h1 className="jcdesPara">Description</h1>
        <p className="jcjobdes">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobsCard
