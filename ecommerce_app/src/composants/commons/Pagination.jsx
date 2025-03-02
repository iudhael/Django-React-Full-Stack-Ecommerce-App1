import React, { useEffect, useState }  from 'react'
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaCircleChevronRight } from "react-icons/fa6";
import ReactPaginate from 'react-paginate';

export default function Pagination({ pageCount, handlePageClick }) {





  return (
    <div>
      <ReactPaginate 
        
        breakLabel={<span className="mx-2 h4">. . .</span>}
        nextLabel={
          <span className=" text-white mx-2 h1 "><FaCircleChevronRight /></span>
        }

        previousLabel={
          <span className="text-white mx-2 h1"><FaCircleChevronLeft /></span>
        }
        marginPagesDisplayed={2}


        
        pageRangeDisplayed={3}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        //renderOnZeroPageCount={null}
        breakClassName="page-item"
        previousClassName="page-item mb-2"
        nextClassName="page-item mb-2"
        containerClassName="pagination mt-5 d-flex align-items-center justify-content-center"
        pageClassName="page-item"
        
        breakLinkClassName="page-lin text-white text-decoration-none"
        pageLinkClassName="bg-white p-2 rounded text-dark text-decoration-none mx-2 h4"
        activeClassName="active-page"
      />

      
      

      
    </div>
  )
}
