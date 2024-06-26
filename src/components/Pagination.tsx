interface PaginationProps {
  itemsPerPage: number
  totalItems: number
  paginate: (pageNumber: number) => void
}

export const Pagination = ({ itemsPerPage, totalItems, paginate }: PaginationProps) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
