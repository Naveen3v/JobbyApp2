import './index.css'

const SkillsCard = props => {
  const {skillDetails} = props
  const {imageUrl, name} = skillDetails
  return (
    <li className="scList">
      <img src={imageUrl} alt="skills" className="skImg" />
      <p className="scPara">{name}</p>
    </li>
  )
}

export default SkillsCard
