import React, { useState } from "react"
import stl from "./Paginator.module.css"

type PaginatorType = {
   currentPage: number
   onPageChanged: (p: number) => void
   totalUserCount: number
   pageSize: number
   portionSize?: number

}

const Paginator: React.FC<PaginatorType> = ({ currentPage, onPageChanged, totalUserCount, pageSize, portionSize = 10 }) => {
   let pagesCount = Math.ceil(totalUserCount / pageSize);
   let pages = [];
   for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
   };

   let [portionNumber, setPortionNumber] = useState(Math.ceil(currentPage / portionSize));


   let leftBorder = (portionNumber - 1) * portionSize + 1;
   let rightBorder = (portionNumber * portionSize);

   return <div>
      {portionNumber > 1 && <button onClick={() => { setPortionNumber(portionNumber - 1) }}>назад</button>}
      {pages.filter(p => p <= rightBorder && p >= leftBorder)
         .map(p => {
            return <span className={currentPage === p && stl.selectedPage}
               onClick={(e) => { onPageChanged(p) }}
            > {p}</span>
         })}
      {portionNumber < pagesCount && <button onClick={() => { setPortionNumber(portionNumber + 1) }}>вперед</button>}
   </div >

}

export default Paginator