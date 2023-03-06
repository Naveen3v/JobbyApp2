import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Profile extends Component {
  state = {profileData: {}}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = {
      name: data.profile_details.name,
      profileImageUrl: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }
    this.setState({profileData: updatedData})
  }

  render() {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="profile">
        <img src={profileImageUrl} className="profileImg" alt="profile" />
        <h1 className="profileHeading">{name}</h1>
        <p className="profilePara">{shortBio}</p>
      </div>
    )
  }
}

export default Profile
