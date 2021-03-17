import React, { useCallback } from 'react'
import Navbar from '../navbar/Navbar'
import CityCard from './CityCard'
import './Home.css'
import useInputField from '../../hooks/useInputField'
import { setParams } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
function Home() {
  const cityLinks = [
    {
      imgLink: 'https://jooble.org/images/cities/us/33025.jpg',
      cityName: 'New York, NY',
      numOfVacancies: 65.535,
    },
    {
      imgLink: 'https://jooble.org/images/cities/us/1.jpg',
      cityName: 'Washington DC',
      numOfVacancies: 56.085,
    },
    {
      imgLink: 'https://jooble.org/images/cities/us/11886.jpg',
      cityName: 'Chicago, IL',
      numOfVacancies: 48.082,
    },
    {
      imgLink: 'https://jooble.org/images/cities/us/10460.jpg',
      cityName: 'Atlanta, GA',
      numOfVacancies: 38.497,
    },
  ]
  const dispatch = useDispatch()
  const history = useHistory()

  const { input: keywordsField } = useInputField('keywords', '', () => true)
  const { input: locationField } = useInputField('location', '', () => true)
  const setParameters = useCallback(() => {
    dispatch(
      setParams({
        keywords: keywordsField.value,
        location: locationField.value,
        page: 1,
      })
    )
    history.push('/jobs')
  }, [dispatch, keywordsField.value, locationField.value, history])

  return (
    <div className="container-fluid">
      <Navbar home={true} />
      <div className="home-search-job container">
        <h1>Your new job, vacancies all over the USA</h1>
        <p>
          More than 583800 current vacancies from 21470 sites available to you.
          Find your new job today.
        </p>
        <form className="form-inline">
          <input
            placeholder="What position are you looking for"
            type="text"
            className="form-control"
            {...keywordsField}
          />
          <input
            placeholder="Location"
            {...locationField}
            type="text"
            className="form-control"
          />
          <button
            type="button"
            onClick={setParameters}
            className="btn btn-primary"
          >
            Find Jobs
          </button>
        </form>
      </div>
      <hr />
      <div className="portfolio container-fluid">
        <h2>Job search by city, job in USA</h2>
        <p>
          More than 60 regions USA available for search. Find a job that matches
          your request.
        </p>
        <div className="row">
          {cityLinks.map(city => {
            return (
              <div
                key={city.imgLink}
                className="card-column col-xl-3 col-lg-6 col-md-12"
              >
                <CityCard city={city} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Home
