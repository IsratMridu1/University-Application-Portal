import React from 'react'
import {Row,Col} from 'reactstrap'
const Pagination = ({ dataPerPage, totalData, paginate, currentPage }) => {

    let PageIndex = 0;
    let PageSize = 0;
    let TotalCount = 0;
    let TotalPages = 0;
    let PreviousPage = 0;
    let NextPage = 0;
  
    const totalpages = Math.ceil(totalData / dataPerPage);
    let startpage = currentPage - 5;
    let endpage = currentPage + 4;
    if (startpage <= 0) {
        endpage = endpage - (startpage - 1);
        startpage = 1;
    }
    if (endpage > totalpages) {
        endpage = totalpages;
        if (endpage > 10) {
            startpage = endpage - 9;
        }
    }
    TotalCount = totalData;
    PageIndex = currentPage;
    PageSize = dataPerPage;
    TotalPages = totalpages;
    PreviousPage = startpage;
    NextPage = endpage;


    // const prev = currentPage > 1 ? (currentPage - 1) : 1;
    // const last = Math.ceil(totalData / dataPerPage);
    //     for (let i = 1; i <= Math.ceil(totalData/dataPerPage); i++) {

    //         pageNumbers.push(i)
    //     }

    // let newPageNumbers;

    // if(pageNumbers.length>10){
    //  newPageNumbers = pageNumbers.slice(0,10)
    // }
    const pageNumbers = [];
    const last = NextPage;
    const next = (last === currentPage) ? currentPage : currentPage + 1;

    const prev = PreviousPage;
    
    for (let i = PreviousPage; i <= NextPage; i++){
        pageNumbers.push(i)
    }

        return (
         <Row>
             <Col md="6">
             <nav className="page navigation uapp-pagination">
                <ul className="pagination ml-2">

                    {
                        PageIndex > 1 &&
                        <>
                  <li className="pagination-item pagination-First">
                        <p style={{ cursor: 'pointer' }} onClick={() => paginate(1)} className="page-link">
                            First
                        </p>
                    </li>

                    <li className="pagination-item">
                        <p style={{ cursor: 'pointer' }} onClick={() => paginate(PageIndex - 1)} className="page-link">
                      <i className="fas fa-chevron-left"></i>
                        </p>
                    </li>
                        </>
                    }

                    

                    {

                        pageNumbers.map(number =>

                            PageIndex==number ?
                            <li key={number} className="pagination-item ">
                                <p style={{ cursor: 'pointer' }} onClick={() => paginate(number)} className="page-link page-active">
                                    {number}
                                </p>
                            </li>
                            :
                            <li key={number} className="pagination-item">
                            <p style={{ cursor: 'pointer' }} onClick={() => paginate(number)} className="page-link">
                                {number}
                            </p>
                        </li>

                        )
                    }
                    {
                        PageIndex < TotalPages &&
                        <>
                        <li className="pagination-item">
                        <p style={{ cursor: 'pointer' }} onClick={() => paginate(PageIndex + 1)} className="page-link">
                      <i className="fas fa-chevron-right"></i>
                        </p>
                    </li>
                  <li className="pagination-item pagination-Last">
                        <p style={{ cursor: 'pointer' }} onClick={() => paginate(TotalPages)} className="page-link">
                            Last
                        </p>
                    </li>
                        </>
                    }
                </ul>
            </nav>
             </Col>

             <Col md="6" style={{textAlign: 'right', marginTop: '1.5%', paddingRight: '2.5%'}}>
                 <h5>Total Results Found: {totalData}</h5>
             </Col>
         </Row>
        )
}

export default Pagination