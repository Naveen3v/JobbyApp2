import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import JobsCard from '../JobsCard'
import Profile from '../Profile'
import EmploymentFilter from '../EmploymentFilter'
import SalaryFilter from '../SalaryFilter'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    jobsList: [],
    searchInput: '',
    activeEmploymentId: '',
    activeSalaryId: '',
    showLoader: false,
  }

  componentDidMount() {
    this.getJobsList()
  }

  changeInput = event => this.setState({searchInput: event.target.value})

  EnterKey = event => {
    if (event.key === 'Enter') {
      this.getJobsList()
    }
  }

  salaryIdChange = value => {
    this.setState({activeSalaryId: value}, this.getJobsList)
  }

  employIdChange = value => {
    this.setState({activeEmploymentId: value}, this.getJobsList)
  }

  getJobsList = async () => {
    const {activeEmploymentId, activeSalaryId, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentId}&minimum_package=${activeSalaryId}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = data.jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      packagePerAnnum: each.package_per_annum,
      rating: each.rating,
      title: each.title,
    }))
    this.setState({jobsList: updatedData})
  }

  render() {
    const {jobsList, searchInput, showLoader} = this.state
    return (
      <div className="jobsmainCont">
        <Header />
        <div className="jobsCont">
          <div className="filterCont">
            <Profile />
            <hr className="lineFilter" />
            <h1 className="teHeading">Type of Employment</h1>
            <ul className="employCont">
              {employmentTypesList.map(each => (
                <EmploymentFilter
                  employDetails={each}
                  key={each.employmentTypeId}
                  employIdChange={this.employIdChange}
                />
              ))}
            </ul>
            <h1 className="teHeading">Salary Range</h1>
            <ul className="salaryCont">
              {salaryRangesList.map(each => (
                <SalaryFilter
                  salaryDetails={each}
                  key={each.salaryRangeId}
                  salaryIdChange={this.salaryIdChange}
                />
              ))}
            </ul>
          </div>
          <div className="jobstextCont">
            <input
              type="search"
              placeholder="Search"
              value={searchInput}
              className="searchEle"
              onChange={this.changeInput}
              onKeyDown={this.EnterKey}
            />
            <button type="button" data-testid="searchButton">
              <AiOutlineSearch />
            </button>
            {showLoader && (
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            )}
            <ul className="jobslistCont">
              {jobsList.map(each => (
                <JobsCard jobDetails={each} key={each.id} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
