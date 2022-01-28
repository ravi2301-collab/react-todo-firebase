import React from 'react'
import axios from 'axios'

export default function Header({  
    setCategory,
    setLoading,
    setNews, 
    setSearch, 
    search,
    setMakeSearch
}) {
    const getData =  () => {
        var api = `https://newsapi.org/v2/everything?q=${search}&pageSize=100&apiKey=${ process.env.REACT_APP_API}`
        setMakeSearch(true)
        setLoading(true)
        axios.get(api)
        .then( res =>{
          const data = res.data.articles
          setNews(data)
          setLoading(false)
          setSearch('')
        })
    }
    const triggerResult = (e) => {
        setCategory(e.target.innerHTML.toLowerCase())
        setMakeSearch(false)
    }
    return (
        <div className="header">
            <div className="logo">
               <i className="fas fa-newspaper"></i>
               <span> Daily News </span>
            </div>
            <ul>
                <li onClick={((e) => triggerResult(e)  )}> Business </li>
                <li onClick={((e) =>  triggerResult(e)  )}> Entertainment </li>
                <li onClick={((e) =>  triggerResult(e)  )}> Science </li>
                <li onClick={((e) =>  triggerResult(e)  )}> Politics </li>
            </ul>
            <div className="search">
                <input onChange={(({target})=> setSearch(target.value) )} value={search} type="text" placeholder="Search Article" />
                <button type="button" onClick={getData}> Search</button>
            </div>
        </div>
    )
}
