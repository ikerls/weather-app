// current weather
function apiWeather(loc, lang = "es") {
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
  $("form").on("submit", (e) => {
    e.preventDefault();
    let location = $("input").val();
    $.ajax(apiWeather(location))
      .done((response) => {
        const {
          weather: [{ description, icon }],
          main: { temp },
          name,
        } = response;
        const main_icon = $("#main_icon");
        if (main_icon.children().length > 0) {
          main_icon.empty();
        }
        console.log(icon);
        // selector del icono:
        function iconSelector(icon) {
          switch (icon) {
            //Sunny
            case "01d":
              main_icon.append("<div class='sunny'></div>");
              break;
            case "01n":
              main_icon.append("<div class='moon'></div>");
              break;
            //Partly cloudy
            case "02d":
              main_icon.append("<div class='partly_cloudy_night'></div>");
              $("<div class='partly_cloudy_night__moon'></div>").appendTo(
                "#main_icon .partly_cloudy_night"
              );
              $("<div class='partly_cloudy_night__cloud'></div>").appendTo(
                "#main_icon .partly_cloudy_night"
              );
              break;
            case "02n":
              main_icon.append("<div class='partly_cloudy'></div>");
              $("<div class='partly_cloudy__sun'></div>").appendTo(
                "#main_icon .partly_cloudy"
              );
              $("<div class='partly_cloudy__cloud'></div>").appendTo(
                "#main_icon .partly_cloudy"
              );
              break;
            //Cloudy
            case "03d":
            case "03n":
            case "04d":
            case "04n":
              main_icon.append("<div class='cloudy'></div>");
              break;
            //Rainy
            case "09d":
            case "09n":
            case "10d":
            case "10n":
              main_icon.append("<div class='rainy'></div>");
              $("<div class='rainy__cloud'></div>").appendTo(
                "#main_icon .rainy"
              );
              $("<div class='rainy__rain'></div>").appendTo(
                "#main_icon .rainy"
              );
              break;
            //Thundery
            case "11d" || "11n":
              main_icon.append("<div class='thundery'></div>");
              $("<div class='thundery__cloud'></div>").appendTo(
                "#main_icon .thundery"
              );
              $("<div class='thundery__rain'></div>").appendTo(
                "#main_icon .thundery"
              );
              break;
          }
        }
        iconSelector(icon);

        $("h2").text(name);
        $("h1").text(Math.round(temp) + "°");
        $("p").text(description);
      })
      .fail(() => {
        // error en la peticion
        alert("ciudad no encontrada");
      });
  });
});
