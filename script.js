var scores = {
  confirmed: "0",
  recovered: "-1",
  deceased: "-1",
  getScores: () => {
    Papa.parse(
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv",
      {
        download: true,
        dynamicTyping: true,
        // header: true,
        complete: function (results) {
          scores.confirmed = results.data[16].pop();
          document.querySelector(".confirmed").innerHTML = scores.confirmed;
        }
      }
    );

    Papa.parse(
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv",
      {
        download: true,
        dynamicTyping: true,
        // header: true,
        complete: function (results) {
          scores.recovered = results.data[16].pop();
          document.querySelector(".recovered").innerHTML = scores.recovered;
        }
      }
    );

    Papa.parse(
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv",
      {
        download: true,
        dynamicTyping: true,
        // header: true,
        complete: function (results) {
          scores.deceased = results.data[16].pop();
          document.querySelector(".deceased").innerHTML = scores.deceased;
        }
      }
    );

    $(".tag").removeClass("is-black").addClass("is-danger")
  }
}

scores.getScores()
setInterval(scores.getScores, 600000)

VANTA.CELLS({
  el: ".cells",
  mouseControls: true,
  touchControls: true,
  minHeight: 200.0,
  minWidth: 200.0,
  scale: 1.0,
  color1: 0x0,
  color2: (scores.confirmed > scores.recovered) || (scores.deceased > scores.confirmed + scores.recovered) ? 0xff0000 : 0x00ffff
});