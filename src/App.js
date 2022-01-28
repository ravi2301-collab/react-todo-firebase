
import './App.css';
import axios from 'axios'
import Header from './components/Header'
import News from './components/News'
import { useState, useEffect } from 'react'



function App() {
  const [ loading, setLoading ] = useState(true)
  const [ search, setSearch ] = useState('')
  const [ news, setNews ] = useState([])
  const [ category, setCategory] = useState('top')
  const[makesearch, setMakeSearch] = useState(false)
  const [result, setResult ] = useState('')
  useEffect(() => {
    const getNews = async () => {
      var api = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${ process.env.REACT_APP_API}`
      axios.get(api)
      .then( res =>{
        const data = res.data.articles
        setLoading(false)
        setNews(data)
        
      }).catch( err => alert("Error Occured. Reload Page"))
    }
    getNews()
  },[])

  useEffect(() => {
  setResult(search)
  },[makesearch])

  return (
    <div className="App">
      <Header
      setCategory ={ setCategory }
      search= { search }
      setSearch={setSearch}
      setLoading={setLoading}
      makesearch={makesearch}
      setNews = { setNews }
      setMakeSearch={setMakeSearch}
      /> 
      <News 
      category= {category}
      setNews = { setNews }
      news={ news }
      loading={loading}
      setLoading= { setLoading }
      makesearch={makesearch}
      result={result}
      />
    </div>
  );
}

export default App;
