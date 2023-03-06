import './index.css'

const EmploymentFilter = props => {
  const {employDetails, employIdChange} = props
  const {label, employmentTypeId} = employDetails

  const changeEmployId = event => {
    employIdChange(event.target.value)
  }

  return (
    <li className="employList">
      <label className="labelList" htmlFor={employmentTypeId}>
        {label}
      </label>
      <input
        type="checkbox"
        id={employmentTypeId}
        onChange={changeEmployId}
        value={employmentTypeId}
      />
    </li>
  )
}

export default EmploymentFilter
