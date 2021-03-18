import React from 'react'
import { LocationIcon, BriefcaseIcon, ClockIcon } from '../../utils/SvgIcons'
import './JobCard.css'
import moment from 'moment'
import ReactMarkdown from 'react-markdown'

function JobCard({ title, description, location, created_at, salary }) {
  return (
    <div className="job-card card">
      <div className="card-body">
        <div style={{ display: 'flex' }}>
          <div className="jobs-card-title">
            <div className="card-title h5">{title}</div>
            <div className="list-group-item">
              <BriefcaseIcon /> {'$'}
              {salary}
              {'k'}
            </div>
          </div>
          <div className="jobs-fixed-div"></div>
        </div>
        <ReactMarkdown
          source={
            description.length > 400
              ? description.slice(0, 398) + '...'
              : description
          }
        />
        {/* </p> */}
        <div className="list-group icons-list ">
          <div className="list-group-item">
            <LocationIcon /> {location}
          </div>
          <div className="list-group-item">
            <ClockIcon /> {moment(created_at).fromNow()}
          </div>
          <div className="list-group-item">
            <span className="job-type badge">
              {location.includes('Remote') ? 'Remote Job' : 'In Office'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobCard
