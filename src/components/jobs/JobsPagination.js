import React from 'react'
import useJobsPagination from './useJobsPagination'

function JobsPagination() {
  const { page, changePage, hasNextPage } = useJobsPagination()

  return (
    <ul className="pagination">
      {page !== 1 && (
        <li className="page-item" onClick={() => changePage(page - 1)}>
          <div className="page-link" role="button">
            <span aria-hidden="true">‹</span>
            <span className="sr-only">Previous</span>
          </div>
        </li>
      )}
      {page !== 1 && (
        <li className="page-item" onClick={() => changePage(1)}>
          <div className="page-link" role="button">
            1
          </div>
        </li>
      )}
      {page > 2 && (
        <li className="page-item">
          <div className="page-link" role="button">
            <span aria-hidden="true">…</span>
            <span className="sr-only">More</span>
          </div>
        </li>
      )}
      {page > 2 && (
        <li className="page-item" onClick={() => changePage(page - 1)}>
          <div className="page-link" role="button">
            {page - 1}
          </div>
        </li>
      )}
      {
        <li className="page-item active">
          <span className="page-link">
            {page}
            <span className="sr-only">(current)</span>
          </span>
        </li>
      }
      {hasNextPage && (
        <li className="page-item" onClick={() => changePage(page + 1)}>
          <div className="page-link" role="button">
            {page + 1}
          </div>
        </li>
      )}
      {hasNextPage && (
        <li className="page-item" onClick={() => changePage(page + 1)}>
          <div className="page-link" role="button">
            <span aria-hidden="true">›</span>
            <span className="sr-only">Next</span>
          </div>
        </li>
      )}
    </ul>
  )
}

export default JobsPagination
