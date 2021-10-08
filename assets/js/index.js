const settings = {
  async: true,
  crossDomain: true,
  url: "http://api.openweathermap.org/data/2.5/weather?q=moscu&units=metric&appid=3c100b21bad8bdc82ba2121560f63892",
  method: "GET",
  headers: {},
};

$(function () {
  $.ajax(settings).done(function (response) {
    const {
      weather,
      main: { temp },
    } = response;
    console.log(weather[0].description);
    console.log(temp);
    $("h1").text(Math.round(temp));
    $("p").text(weather[0].description);
  });
});
