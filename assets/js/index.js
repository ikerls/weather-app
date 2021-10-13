// current weather
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
		case "02d":
			location.append("<div class='partly_cloudy_night'></div>");

			$("<div class='partly_cloudy_night__moon'></div>").appendTo(
				location.children()
			);
			$("<div class='partly_cloudy_night__cloud'></div>").appendTo(
				location.children()
			);
			break;
		case "02n":
			location.append("<div class='partly_cloudy'></div>");
			$("<div class='partly_cloudy__sun'></div>").appendTo(
				location.children()
			);
			$("<div class='partly_cloudy__cloud'></div>").appendTo(
				location.children()
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
			$("<div class='rainy__cloud'></div>").appendTo("#main_icon .rainy");
			$("<div class='rainy__rain'></div>").appendTo(location.children());
			break;
		//Thundery
		case "11d":
		case "11n":
			main_icon.append("<div class='thundery'></div>");
			$("<div class='thundery__cloud'></div>").appendTo(
				location.children()
			);
			$("<div class='thundery__rain'></div>").appendTo(
				location.children()
			);
			break;
	}
}

$(function () {
	$("form").on("submit", (e) => {
		e.preventDefault();
		let location = $("input").val();
		$.ajax(apiWeather(location))
			.done((response) => {
				const {
					coord: { lon, lat },
					weather: [{ description, icon }],
					main: { temp },
					name,
				} = response;
				const main_icon = $("#main_icon");
				if (main_icon.children().length > 0) {
					main_icon.empty();
				}

				$.ajax(apiForecast(lat, lon))
					.done((response) => {
						const { daily } = response;
						console.log(daily);
						for (const {
							dt,
							temp: { day },
							weather: [{ description, icon }],
						} of daily) {
							console.log({ dt, description, icon, day });
						}
					})
					.fail(() => {
						alert("se ha producido un error;");
					});
				console.log({ lon, lat });
				console.log(icon);
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
