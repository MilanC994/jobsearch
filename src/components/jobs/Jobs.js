import React from 'react'
import './Jobs.css'
import JobCard from '../jobCard/JobCard'
import Navbar from '../navbar/Navbar'
import useJobs from './useJobs'
import JobsPagination from './JobsPagination'
import { BeatLoader } from 'react-spinners'
import filters from '../../utils/filters'

function Jobs() {
  const {
    filteredJobs: jobs,
    loading,
    reduxFilters,
    onFiltersChangeChange,
    onJobTypeFilterChange,
  } = useJobs()

  const { salary, fullOrPartTime, date } = reduxFilters

  const override = `css
  position: absolute;
  position: absolute;
  left:40%;
  margin-top: 10%;
`
  return (
    <>
      <Navbar />
      <div className="jobs-container container-fluid">
        <div className="row">
          <div className="d-none d-lg-block filters col-lg-3">
            <h1>Filters</h1>
            <div className="list-group">
              <div className="list-group-item">Date of posting</div>
              {filters.date.map(d => {
                return (
                  <div key={d.id} className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={d.name}
                      id={d.id}
                      onChange={onFiltersChangeChange}
                      value={d.value}
                      checked={d.value === date}
                    />
                    <label className="form-check-label" htmlFor={d.id}>
                      {d.text}
                    </label>
                  </div>
                )
              })}
            </div>
            <div className="list-group">
              <div className="list-group-item">Salary</div>
              {filters.salary.map(s => {
                return (
                  <div key={s.id} className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={s.name}
                      id={s.id}
                      value={s.from}
                      onChange={onFiltersChangeChange}
                      checked={s.from === salary.from && s.to === salary.to}
                    />
                    <label className="form-check-label" htmlFor={s.id}>
                      {s.text}
                    </label>
                  </div>
                )
              })}
            </div>
            <div className="list-group">
              <div className="list-group-item">Job Type</div>
              {filters.fullOrPartTime.map(jt => {
                return (
                  <div key={jt.id} className="form-check ml-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name={jt.name}
                      id={jt.id}
                      value={jt.value}
                      onChange={onJobTypeFilterChange}
                      checked={
                        jt.value === fullOrPartTime || fullOrPartTime === 'both'
                      }
                    />
                    <label className="form-check-label" htmlFor={jt.id}>
                      {jt.text}
                    </label>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="col-lg-9">
            <div className="jobs-info container">
              <h1>Jobs</h1>
              <h5>Found {jobs.length} jobs</h5>
              <form className="form-inline">
                <label className="form-label">Get new jobs by email </label>
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    id="custom-switch"
                    className="custom-control-input"
                  />
                  <label
                    title=""
                    htmlFor="custom-switch"
                    className="custom-control-label"
                  />
                </div>
              </form>
              {/* <SalaryModal
                show={salaryModalOpen}
                handleClose={toggleSalaryModal}
              /> */}
              <JobsPagination />
            </div>
            {loading ? (
              <div>
                <BeatLoader loading css={override} />
              </div>
            ) : (
              jobs &&
              jobs.map(job => {
                return (
                  <JobCard
                    key={job.id}
                    title={job.title}
                    created_at={job.created_at}
                    description={job.description}
                    location={job.location}
                    salary={job.salary}
                  />
                )
              })
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Jobs
