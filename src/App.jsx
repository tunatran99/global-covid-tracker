import React, { useEffect, useState, createContext } from 'react'
import { fetchData } from './api/api'
import Card from './components/Card'
import Chart from './components/Chart'
import CountryDropDown from './components/CountryDropDown'
import banner from './assets/images/banner.png'
import * as ReactBootstrap from 'react-bootstrap'

export const AppContext = createContext(undefined);

function App() {
  const [fetch, SetFetch] = useState()
  const [loading, SetLoading] = useState(false)
  const [name, setName] = useState('Thế giới')

  useEffect(() => {
    fetchData(name).then((res) => SetFetch(res))
    SetLoading(true)
  }, [name])

  return (
    <div className="container">
      <img className='banner' src={banner} alt="banner" />
      {loading ? 
      fetch && <AppContext.Provider value={fetch}>
        <CountryDropDown setName={setName} />
        <Card />
        <Chart name={name} />
      </AppContext.Provider>
      :
      <ReactBootstrap.Spinner className='spinner-bootstrap' animation="border" />}
    </div>
  );
}

export default App;
