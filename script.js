var cases = {
  confirmed: "0",
  recovered: "-1",
  deceased: "-1",
  todayConfirmed: 0,
  todayRecovered: 0,
  todayDeceased: 0,
  timeout: 3000,
  cells: true,
  getCases: () => {
    XHR = new XMLHttpRequest()

    XHR.timeout = cases.timeout
    XHR.ontimeout = () => {
      $(".hero-head .tag").removeClass("is-danger").addClass("is-black")
      timeout *= 2
    }

    XHR.onload = () => {
      countries = JSON.parse(XHR.response)

      for (country of countries) {
        if (country.country === "India") {
          cases.confirmed = country.cases
          cases.recovered = country.recovered
          cases.deceased = country.deaths
          cases.todayConfirmed = country.todayCases
          cases.todayRecovered = country.todayRecovered
          cases.todayDeceased = country.todayDeaths
          break
        }
      }

      $(".confirmed").text(cases.confirmed)
      $(".recovered").text(cases.recovered)
      $(".deceased").text(cases.deceased)
      if (cases.todayConfirmed > 0) $(".hero-body .is-warning").text("+" + cases.todayConfirmed).show()
      if (cases.todayRecovered > 0) $(".hero-body .is-link").text("+" + cases.todayRecovered).show()
      if (cases.todayDeceased > 0) $(".hero-body .is-dark").text("+" + cases.todayDeceased).show()

      $(".hero-head .tag").removeClass("is-black").addClass("is-danger")
    }

    XHR.onloadend = () => {
      if (cases.cells) {
        VANTA.CELLS({
          el: ".cells",
          mouseControls: true,
          touchControls: true,
          minHeight: $(".hero-head").outerHeight(),
          minWidth: 200.0,
          scale: 1.0,
          color1: 0x0,
          color2: (cases.confirmed > cases.recovered) || (cases.deceased > cases.recovered) ? 0xff0000 : 0x00ffff
        })
        cases.cells = false
      }
    }

    XHR.onerror = () => {
      $(".hero-head .tag").removeClass("is-danger").addClass("is-black")

      Papa.parse(
        "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv",
        {
          download: true,
          dynamicTyping: true,
          // header: true,
          complete: function (results) {
            cases.confirmed = results.data[16].pop()
            $(".confirmed").innerHTML = cases.confirmed
            $(".hero-head .tag").removeClass("is-black").addClass("is-danger")
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
            $(".hero-head .tag").removeClass("is-black").addClass("is-danger")
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
            $(".hero-head .tag").removeClass("is-black").addClass("is-danger")
          }
        }
      )
    }

    XHR.open("GET", "https://coronavirus-19-api.herokuapp.com/countries", true)
    XHR.send()
  }
}

cases.getCases()
setInterval(cases.getCases, 5000)