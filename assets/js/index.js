function apiWeather(loc, lang = "en") {
  return {
    async: true,
    crossDomain: true,
    url:
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      loc +
      "&units=metric&appid=3c100b21bad8bdc82ba2121560f63892&lang=" +
      lang +
      "",
    method: "GET",
    headers: {},
  };
}

$(function () {
  $("form").on("submit", function (e) {
    e.preventDefault();
    let location = $("input").val();
    $.ajax(apiWeather(location)).done(function (response) {
      const {
        weather,
        main: { temp },
        name,
      } = response;
      console.log(weather[0].description);
      console.log(temp);
      $("h2").text(name);
      $("h1").text(Math.round(temp) + "°");
      $("p").text(weather[0].description);
    });
  });
});
