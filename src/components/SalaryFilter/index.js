import './index.css'

const SalaryFilter = props => {
  const {salaryDetails, salaryIdChange} = props
  const {label, salaryRangeId} = salaryDetails

  const changeSalaryId = event => {
    salaryIdChange(event.target.value)
  }

  return (
    <li className="employList">
      <label className="labelList" htmlFor={salaryRangeId}>
        {label}
      </label>
      <input
        type="radio"
        id={salaryRangeId}
        value={salaryRangeId}
        onChange={changeSalaryId}
      />
    </li>
  )
}

export default SalaryFilter
