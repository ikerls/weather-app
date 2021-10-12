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
        weather: [{ description, icon }],
        main: { temp },
        name,
      } = response;
      const main_icon = $("#main_icon");
      if (main_icon.children().length > 0) {
        main_icon.empty();
      }
      // selector del icono:
      switch (icon) {
        //Sunny
        case "01d":
          main_icon.append("<div class='sunny'></div>");
          break;
        //Partly cloudy
        case "02d":
          main_icon.append("<div class='partly_cloudy'></div>");
          $("<div class='partly_cloudy__sun'></div>").appendTo(
            "#main_icon .partly_cloudy"
          );
          $("<div class='partly_cloudy__cloud'></div>").appendTo(
            "#main_icon .partly_cloudy"
          );
          break;
        //Cloudy
        case "03d" || "03n" || "04d" || "04n":
          break;
        //Rainy
        case "09d" || "09n" || "10d" || "10n":
          break;
        //Thundery
        case "11d" || "11n":
          break;
        default:
          break;
      }

      //console.log(icon);
      //console.log(temp);
      $("h2").text(name);
      $("h1").text(Math.round(temp) + "°");
      $("p").text(description);
    });
  });
});
