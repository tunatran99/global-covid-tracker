import axios from "axios";

export const fetchData = async (countryName) => {
  try {
    const res = await axios.get('https://coviddata.github.io/coviddata/v1/countries/stats.json')
    const data = res.data

    let confirmedTotal = 0, infectedTotal = 0, recoveredTotal = 0, deathTotal = 0,
      confirmedNew = 0, infectedNew = 0, recoveredNew = 0, deathNew = 0
    var latest_date, casesArray = []

    const chartDate = ["2020-03-22", "2020-04-04", "2020-07-14", "2020-11-10", "2021-01-05", "2021-02-13"]

    const countriesName = data.map(item => item.country.name)

    if (countryName === 'Thế giới') {
      countriesName.forEach((name) => {
        const index = data.findIndex(item => item.country.name === name)
        const countryData = data[index]
        const history = Object.keys(countryData.dates)
        latest_date = history[history.length - 1]

        confirmedTotal += countryData.dates[latest_date].cumulative.cases
        recoveredTotal += countryData.dates[latest_date].cumulative.recoveries
        deathTotal += countryData.dates[latest_date].cumulative.deaths

        confirmedNew += countryData.dates[latest_date].new.cases
        recoveredNew += countryData.dates[latest_date].new.recoveries
        deathNew += countryData.dates[latest_date].new.deaths

        history.forEach((date) => {
          if (chartDate.includes(date)) {
            var elIndex = casesArray.findIndex(el => el.date === date)
            if (elIndex !== -1) {
              casesArray[elIndex].total += countryData.dates[date].cumulative.cases
              casesArray[elIndex].recovered += countryData.dates[date].cumulative.recoveries
              casesArray[elIndex].death += countryData.dates[date].cumulative.deaths
              casesArray[elIndex].active += countryData.dates[date].cumulative.cases -
                (countryData.dates[date].cumulative.recoveries + countryData.dates[date].cumulative.deaths)
            }
            else {
              const data = {
                date: date,
                total: countryData.dates[date].cumulative.cases,
                active: countryData.dates[date].cumulative.cases -
                  (countryData.dates[date].cumulative.recoveries + countryData.dates[date].cumulative.deaths),
                recovered: countryData.dates[date].cumulative.recoveries,
                death: countryData.dates[date].cumulative.deaths
              }

              casesArray.push(data)
            }
          }
        })
      })
    }
    else {
      const index = data.findIndex(item => item.country.name === countryName)
      const countryData = data[index]
      const history = Object.keys(countryData.dates)
      latest_date = history[history.length - 1]

      confirmedTotal += countryData.dates[latest_date].cumulative.cases
      recoveredTotal += countryData.dates[latest_date].cumulative.recoveries
      deathTotal += countryData.dates[latest_date].cumulative.deaths

      confirmedNew += countryData.dates[latest_date].new.cases
      recoveredNew += countryData.dates[latest_date].new.recoveries
      deathNew += countryData.dates[latest_date].new.deaths

      history.forEach((date) => {
        if (chartDate.includes(date)) {
          const data = {
            date: date,
            total: countryData.dates[date].cumulative.cases,
            active: countryData.dates[date].cumulative.cases -
              (countryData.dates[date].cumulative.recoveries + countryData.dates[date].cumulative.deaths),
            recovered: countryData.dates[date].cumulative.recoveries,
            death: countryData.dates[date].cumulative.deaths
          }

          casesArray.push(data)
        }
      })
    }

    infectedTotal = confirmedTotal - (recoveredTotal + deathTotal)
    infectedNew = confirmedNew - (recoveredNew + deathNew)
    return {
      countriesName, data, latest_date, confirmedTotal, infectedTotal, recoveredTotal, deathTotal,
      confirmedNew, infectedNew, recoveredNew, deathNew, casesArray
    }
  }
  catch (err) {
    console.log(err)
  }
}