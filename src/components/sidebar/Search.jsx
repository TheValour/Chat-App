import React from 'react'
import './Search.css'

export default function Search() {
  return (
    <div className='search-container'>
        <div className="searchForm " >
            <input type="text" placeholder='Find User'/>
        </div>
        <div className="userChat flex">
            <img src="./logo512.png" alt="" />
            <div className="userCharInfo">
                <span>Bob</span>
            </div>
        </div>
    </div>
  )
}
