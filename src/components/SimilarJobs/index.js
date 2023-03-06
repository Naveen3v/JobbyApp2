import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {similarDetails} = props
  const {
    companyLogoUrl,
    rating,
    location,
    title,
    id,
    jobDescription,
    employmentType,
  } = similarDetails
  return (
    <li className="sjList">
      <div className="sjImgCont">
        <img
          src={companyLogoUrl}
          className="sjImg"
          alt="similar job company logo"
        />
        <div className="sjImgTitle">
          <h1 className="sjHeading">{title}</h1>
          <AiFillStar />
          <p className="sjPara">{rating}</p>
        </div>
      </div>
      <h1 className="sjHeading">Description</h1>
      <p className="sjPara">{jobDescription}</p>
      <GoLocation className="SLocationImg" />
      <p className="sjPara">{location}</p>
      <BsBriefcaseFill className="SLocationImg" />
      <p className="sjPara">{employmentType}</p>
    </li>
  )
}

export default SimilarJobs
