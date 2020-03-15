var cases = {
  confirmed: "0",
  recovered: "-1",
  deceased: "-1",
  timeout: 3000,
  cells: true,
  getScores: () => {
    XHR = new XMLHttpRequest()

    XHR.timeout = cases.timeout
    XHR.ontimeout = () => {
      $(".tag").removeClass("is-danger").addClass("is-black")
      timeout *= 2
    }

    XHR.onload = () => {
      countries = JSON.parse(XHR.response)

      for (country of countries) {
        if (country.country === "India") {
          cases.confirmed = country.cases
          cases.recovered = country.recovered
          cases.deceased = country.deaths
          break
        }
      }

      $(".confirmed").text(cases.confirmed)
      $(".recovered").text(cases.recovered)
      $(".deceased").text(cases.deceased)

      $(".tag").removeClass("is-black").addClass("is-danger")
    }

    XHR.onloadend = () => {
      if (cases.cells) {
        VANTA.CELLS({
          el: ".cells",
          mouseControls: true,
          touchControls: true,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          color1: 0x0,
          color2: (cases.confirmed > cases.recovered) || (cases.deceased > cases.recovered) ? 0xff0000 : 0x00ffff
        })
        cases.cells = false
      }
    }

    XHR.onerror = () => {
      $(".tag").removeClass("is-danger").addClass("is-black")

      Papa.parse(
        "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv",
        {
          download: true,
          dynamicTyping: true,
          // header: true,
          complete: function (results) {
            cases.confirmed = results.data[16].pop()
            $(".confirmed").innerHTML = cases.confirmed
            $(".tag").removeClass("is-black").addClass("is-danger")
          }
        }
      )

      Papa.parse(
        "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv",
        {
          download: true,
          dynamicTyping: true,
          // header: true,
          complete: function (results) {
            cases.recovered = results.data[16].pop()
            $(".recovered").innerHTML = cases.recovered
            $(".tag").removeClass("is-black").addClass("is-danger")
          }
        }
      )

      Papa.parse(
        "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv",
        {
          download: true,
          dynamicTyping: true,
          // header: true,
          complete: function (results) {
            cases.deceased = results.data[16].pop()
            $(".deceased").innerHTML = cases.deceased
            $(".tag").removeClass("is-black").addClass("is-danger")
          }
        }
      )
    }

    XHR.open("GET", "https://coronavirus-19-api.herokuapp.com/countries", true)
    XHR.send()
  }
}

oldScores = () => {
  Papa.parse(
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv",
    {
      download: true,
      dynamicTyping: true,
      // header: true,
      complete: function (results) {
        cases.confirmed = results.data[16].pop()
        $(".confirmed").innerHTML = cases.confirmed
      }
    }
  )

  Papa.parse(
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv",
    {
      download: true,
      dynamicTyping: true,
      // header: true,
      complete: function (results) {
        cases.recovered = results.data[16].pop()
        $(".recovered").innerHTML = cases.recovered
      }
    }
  )

  Papa.parse(
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv",
    {
      download: true,
      dynamicTyping: true,
      // header: true,
      complete: function (results) {
        cases.deceased = results.data[16].pop()
        $(".deceased").innerHTML = cases.deceased
      }
    }
  )

  $(".tag").removeClass("is-black").addClass("is-danger")
}

cases.getScores()
setInterval(cases.getScores, 5000)