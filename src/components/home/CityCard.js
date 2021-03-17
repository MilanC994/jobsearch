import React from 'react'

function CityCard({ city }) {
  const { imgLink, cityName, numOfVacancies } = city
  return (
    <div className="bg-dark text-white city-card card">
      <img className="card-img" src={imgLink} alt="Card poster" />
      <div className="card-img-overlay">
        <div
          className="container-fluid"
          style={{ position: 'absolute', bottom: ' 0px' }}
        >
          <div className="card-title h5">{cityName}</div>
          <p className="card-text">{numOfVacancies}</p>
        </div>
      </div>
    </div>
  )
}

export default CityCard
