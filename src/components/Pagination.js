const Pagination = ({ vehiclePerPage, totalNumberOfVehicles, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalNumberOfVehicles / vehiclePerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                {pageNumbers.map(number => (
                    <div>
                        <button style={{ padding: '0px 10px', margin: '0px 10px', fontFamily: 'Rubik', fontSize: '20px', border: '2px solid black', backgroundColor: 'white' }} onClick={() => paginate(number)}> {number} </button>
                    </div>
                )
                )}
            </ul>
        </nav>
    )
}

export default Pagination