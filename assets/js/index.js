// current weather
//function apiWeather(loc, lang = "en") {
//  return {
//    async: true,
//    crossDomain: true,
//    url:
//      "http://api.openweathermap.org/data/2.5/weather?q=" +
//      loc +
//      "&units=metric&appid=3c100b21bad8bdc82ba2121560f63892&lang=" +
//      lang +
//      "",
//    method: "GET",
//    headers: {},
//  };
//}
//forecast for 7 days; mas eficiente que utilizar el endpoint onecall que el endpoint forecast
function apiForecast(lat, lon, lang = "en") {
  return {
    async: true,
    crossDomain: true,
    url:
      "http://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&exclude=current%2Cminutely%2Chourly%2Calerts&units=metric&lang=" +
      lang +
      "&appid=3c100b21bad8bdc82ba2121560f63892&=",
    method: "GET",
    headers: {},
  };
}

function clear(root1, root2) {
  // limpieza de hijos generados dinamicamente
  if (root1.children().length > 0) {
    root1.empty();
  }
  if (root2.children().length > 0) {
    root2.empty();
  }
}

// icon selector
function iconSelector(location, icon) {
  switch (icon) {
    //Sunny
    case "01d":
      location.append("<div class='sunny'></div>");
      break;
    case "01n":
      location.append("<div class='moon'></div>");
      break;
    //Partly cloudy
    case "02n":
      location.append("<div class='partly_cloudy_night'></div>");

      $("<div class='partly_cloudy_night__moon'></div>").appendTo(
        location.children()
      );
      $("<div class='partly_cloudy_night__cloud'></div>").appendTo(
        location.children()
      );
      break;
    case "02d":
      location.append("<div class='partly_cloudy'></div>");
      $("<div class='partly_cloudy__sun'></div>").appendTo(location.children());
      $("<div class='partly_cloudy__cloud'></div>").appendTo(
        location.children()
      );
      break;
    //Cloudy
    case "03d":
    case "03n":
    case "04d":
    case "04n":
      location.append("<div class='cloudy'></div>");
      break;
    //Rainy
    case "09d":
    case "09n":
    case "10d":
    case "10n":
      location.append("<div class='rainy'></div>");
      $("<div class='rainy__cloud'></div>").appendTo(location.children());
      $("<div class='rainy__rain'></div>").appendTo(location.children());
      break;
    //Thundery
    case "11d":
    case "11n":
      location.append("<div class='thundery'></div>");
      $("<div class='thundery__cloud'></div>").appendTo(location.children());
      $("<div class='thundery__rain'></div>").appendTo(location.children());
      break;
  }
}

$(function () {
  let enIngles = true;
  const main_icon = $("#main_icon");
  const rootCards = $(".card_container");
  $("#es").on("click", (e) => {
    enIngles = false;
  });
  $("#en").on("click", (e) => {
    enIngles = true;
  });
  $("form").on("submit", (e) => {
    e.preventDefault();
    let location = $("input").val();
    clear(main_icon, rootCards);

    const apiWeather = {
      async: true,
      crossDomain: true,
      url:
        "http://api.openweathermap.org/data/2.5/weather?q=" +
        location +
        "&units=metric&appid=3c100b21bad8bdc82ba2121560f63892&lang=" +
        (enIngles ? "en" : "es") +
        "",
      method: "GET",
      headers: {},
    };
    $.ajax(apiWeather)
      .done((response) => {
        const {
          coord: { lon, lat },
          weather: [{ description, icon }],
          main: { temp },
          name,
        } = response;

        const apiForecast = {
          async: true,
          crossDomain: true,
          url:
            "http://api.openweathermap.org/data/2.5/onecall?lat=" +
            String(lat) +
            "&lon=" +
            String(lon) +
            "&exclude=current%2Cminutely%2Chourly%2Calerts&units=metric&lang=" +
            (enIngles ? "en" : "es") +
            "&appid=3c100b21bad8bdc82ba2121560f63892&=",
          method: "GET",
          headers: {},
        };

        $.ajax(apiForecast)
          .done((response) => {
            const { timezone_offset: offset, daily: tempProximas } = response;
            console.log(offset);
            for (const {
              dt,
              temp: { day: temp },
              weather: [{ description, icon }],
            } of tempProximas) {
              //console.log(new Date(dt * 1000));
              //console.log({ dt, description, icon, temp });
              // TODO: creacion de las tarjetas e implementar sus datos
              rootCards.append("<div class='temp_card'></div>");
              const cardMain = $(".temp_card").last();
              $("<div class='temp_card_text'></div>").appendTo(cardMain);
              $(".temp_card_text")
                .last()
                .text(new Date(dt * 1000).toLocaleDateString());
              $("<div class='temp_card_icon'></div>").appendTo(cardMain);
              iconSelector($(".temp_card_icon").last(), icon);
              $("<div class='temp_card_text'></div>").appendTo(cardMain);
              $(".temp_card_text")
                .last()
                .text(Math.round(temp) + "°");
            }
          })
          .fail(() => {
            alert("se ha producido un error;");
          });
        //console.log({ lon, lat });
        //console.log(icon);

        // selector del icono:
        iconSelector(main_icon, icon);

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
