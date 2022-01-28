import React, { useState, useEffect } from 'react'
import axios from 'axios'
import  LoadingImage  from '../loading.gif'

export default function News({ 
     news,
     category, setNews,
     setLoading, loading,
     makesearch,
     result
    }) {
    const [ pageNum, setPageNum ] = useState(1)
    const [ filter, setFilter ] = useState([])

    const topPageNumber = Math.ceil( news.length / 10)
    const pagination = []
    for(let i = 1; i<= topPageNumber; i++)
    {
        pagination.push(i)
    }
    useEffect(() => {
        setFilter(news.slice(0, 10))
       },[news])

    useEffect(() => {
        const getNews = async () => {
            setLoading(true)
            var api = `https://newsapi.org/v2/top-headlines?country=us&category=${category.trim()}&pageSize=100&apiKey=${ process.env.REACT_APP_API}`
            axios.get(api)
            .then( res =>{
              const data = res.data.articles
              setNews(data)
              setLoading(false)
            })
          }
          getNews()
    },[category])
   
   useEffect(() => {
    setFilter(news.slice( (pageNum - 1) * 10, (pageNum*10)))
   },[pageNum])

    return (
        <div className="news"> 
        { makesearch ? 
        <div className="news-header"> 
            <h2> Search Result for "{result}" </h2>
            <small> { news.length } results found</small>
        </div>:
        <h2 className="news-header"> { category.toUpperCase() } </h2>
         }
            
            <div className="content">
                <div className="pagination">
                    { loading ? <></>: pagination.map((n,i) =>{
                        return (<span key={i}
                        onClick={ e => setPageNum(e.target.innerHTML)}
                        > {n} </span>)})
                    }
                </div>
               {loading ? 
                (<img className="loading-img" alt="Loading" height="200px" src={ LoadingImage }/ >): 
               filter.map((e,i) => {
                   return(
                   <div  className="box" key={i}>
                       <div className="box-header">
                        <span>{ e.publishedAt.slice(0,10) } </span>
                       </div>
                       <p className="title"> { e.title }</p>
                       <span className="author"> { e.author } </span>
                       <p className="content"> {e.content} </p>
                       <a href={e.url}> Read More </a>
                   </div>)
               })}
            </div>
            <div className="pagination">
                { loading ? <></>: pagination.map((n,i) =>{
                    return (<span key={i}
                    onClick={ e => setPageNum(e.target.innerHTML)}
                    > {n} </span>)})}
            </div>
        </div>
    )
}
