import React, {useState} from "react";
import styles from "./Paginator.module.css"
import cn from "classnames"

type PaginatorPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (currentPage: number) => void
}

export const Paginator = (props: PaginatorPropsType) => {
    let portionSize = 10
    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState<number>(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize
    return (
        <div className={styles.paginator}>
            {portionNumber > 1 && <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>Prev</button>}


            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)

                .map(p => {
                    return <span className={cn({[styles.selectedPage]: props.currentPage === p}, styles.pageNumber)}
                                 key={p}
                                 onClick={() => {
                                     props.onPageChanged(p)
                                 }}

                    >{p}</span>
                })}
            {portionCount > portionNumber && <button onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>Next</button>}

        </div>
    )
}

