import {Component} from 'react'
import Cookies from 'js-cookie'

import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsBriefcaseFill} from 'react-icons/bs'

import Header from '../Header'
import SkillsCard from '../SkillsCard'
import SimilarJobs from '../SimilarJobs'

import './index.css'

class JobItemDetails extends Component {
  state = {jobitemDetails: {}, skillsList: [], similarJobs: [], lifeCompany: {}}

  componentDidMount() {
    this.getJobItem()
  }

  getJobItem = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const jobItemDetails = {
      companyLogoUrl: data.job_details.company_logo_url,
      companyWebsiteUrl: data.job_details.company_website_url,
      employmentType: data.job_details.employment_type,
      id: data.job_details.id,
      jobDescription: data.job_details.job_description,

      location: data.job_details.location,
      rating: data.job_details.rating,
      packagePerAnnum: data.job_details.package_per_annum,
      title: data.job_details.title,
    }
    const skillsData = data.job_details.skills.map(each => ({
      imageUrl: each.image_url,
      name: each.name,
    }))
    const lifeDetails = {
      description: data.job_details.life_at_company.description,
      imageUrl: data.job_details.life_at_company.image_url,
    }
    const similarData = data.similar_jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      rating: each.rating,
      title: each.title,
    }))

    this.setState({
      jobitemDetails: jobItemDetails,
      skillsList: skillsData,
      lifeCompany: lifeDetails,
      similarJobs: similarData,
    })
  }

  renderJobItemDetails = () => {
    const {jobitemDetails, skillsList, lifeCompany, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      lifeAtCompany,
    } = jobitemDetails
    const {description, imageUrl} = lifeCompany

    return (
      <div className="jid-main">
        <div className="jid-cont">
          <div className="jidimgCont">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="jidImg"
            />
            <div className="jidImgHeadingCont">
              <h1 className="jidHeading">{title}</h1>
              <div className="jidRatingCont">
                <AiFillStar className="jcStar" />
                <p className="jidHeading">{rating}</p>
              </div>
            </div>
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
          <hr className="jcline" />
          <h1 className="jidHeading">Description</h1>

          <a href={companyWebsiteUrl}>Visit</a>
          <p className="jcjobdes">{jobDescription}</p>
          <h1 className="jidHeading">Skills</h1>
          <ul className="skillsCont">
            {skillsList.map(each => (
              <SkillsCard skillDetails={each} key={each.id} />
            ))}
          </ul>
          <h1 className="jidlc">Life at Company</h1>
          <div className="lac">
            <p className="jidPara">{description}</p>
            <img src={imageUrl} className="lacImg" alt="life" />
          </div>
          <h1 className="jidsj">Similar Jobs</h1>
          <ul className="sjCont">
            {similarJobs.map(each => (
              <SimilarJobs similarDetails={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    const {jobitemList} = this.state
    return (
      <div className="jidCont">
        <Header />
        {this.renderJobItemDetails()}
      </div>
    )
  }
}

export default JobItemDetails
