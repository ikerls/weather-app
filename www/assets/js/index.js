document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
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
				$("<div class='partly_cloudy__sun'></div>").appendTo(
					location.children()
				);
				$("<div class='partly_cloudy__cloud'></div>").appendTo(
					location.children()
				);
				break;
			//Rainy
			case "09d":
			case "09n":
			case "10d":
			case "10n":
				location.append("<div class='rainy'></div>");
				$("<div class='rainy__cloud'></div>").appendTo(
					location.children()
				);
				$("<div class='rainy__rain'></div>").appendTo(
					location.children()
				);
				break;
			//Thundery
			case "11d":
			case "11n":
				location.append("<div class='thundery'></div>");
				$("<div class='thundery__cloud'></div>").appendTo(
					location.children()
				);
				$("<div class='thundery__rain'></div>").appendTo(
					location.children()
				);
				break;
			default:
				//Cloudy
				location.append("<div class='cloudy'></div>");
		}
	}
	function cambioIdioma(ingles) {
		let busqueda = $("input[type='search']");
		if (ingles) {
			busqueda.attr("placeholder", "Search");
		} else {
			busqueda.attr("placeholder", "Busqueda");
		}
	}
	// document.addEventListener("deviceready", onDeviceReady, false);
	// function onDeviceReady() {
	// 	alert("f");
	// }

	$(function () {
		let enIngles = true;
		const princiapl = $("header section");
		const rootCards = $(".card_container");
		$("#es").on("click", (e) => {
			enIngles = false;
			cambioIdioma(enIngles);
		});
		$("#en").on("click", (e) => {
			enIngles = true;
			cambioIdioma(enIngles);
		});
		$("#location").on("click", (e) => {
			var onSuccess = function (position) {
				// let element = document.getElementById("appInfo");
				alert(
					"Latitude: " +
						position.coords.latitude +
						"\n" +
						"Longitude: " +
						position.coords.longitude +
						"\n" +
						"Altitude: " +
						position.coords.altitude +
						"\n" +
						"Accuracy: " +
						position.coords.accuracy +
						"\n" +
						"Altitude Accuracy: " +
						position.coords.altitudeAccuracy +
						"\n" +
						"Heading: " +
						position.coords.heading +
						"\n" +
						"Speed: " +
						position.coords.speed +
						"\n" +
						"Timestamp: " +
						position.timestamp +
						"\n"
				);
			};
			// onError Callback receives a PositionError object
			//
			function onError(error) {
				alert(
					"code: " +
						error.code +
						"\n" +
						"message: " +
						error.message +
						"\n"
				);
			}
			navigator.geolocation.getCurrentPosition(onSuccess, onError);
		});
		$("form").on("submit", (e) => {
			e.preventDefault();

			// limpieza
			if (princiapl.children().length > 0) {
				princiapl.empty();
			}
			if (rootCards.children().length > 0) {
				rootCards.empty();
			}
			let location = $("input").val();

			const apiWeather = {
				async: true,
				crossDomain: true,
				url:
					"https://api.openweathermap.org/data/2.5/weather?q=" +
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

					$("header section").append(
						"<div class='mt-5 d-flex flex-column justify-content-center align-items-center'id='tiempo'></div>"
					);
					$("<h2>" + name + "</h2>").appendTo("#tiempo");
					$("<div id='main_icon'></div>").appendTo("#tiempo");
					$("<h1>" + Math.round(temp) + "°" + "</h1>").appendTo(
						"#tiempo"
					);
					$("<h3>" + description + "</h3>").appendTo("#tiempo");
					iconSelector($("#main_icon"), icon);

					const apiForecast = {
						async: true,
						crossDomain: true,
						url:
							"https://api.openweathermap.org/data/2.5/onecall?lat=" +
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
							const {
								timezone_offset: offset,
								daily: tempProximas,
							} = response;
							let cnt = 0;
							for (const {
								dt,
								temp: { day: temp },
								weather: [{ icon }],
							} of tempProximas) {
								cnt++;
								if (cnt == 1) {
									continue;
								} else if (cnt > 5) {
									break;
								}
								rootCards.append(
									"<div class='temp_card'></div>"
								);
								const cardMain = $(".temp_card").last();
								$(
									"<div class='temp_card_text'></div>"
								).appendTo(cardMain);
								let dia = new Date(dt * 1000)
									.toLocaleDateString(
										enIngles ? "en-US" : "es-ES",
										{
											weekday: "long",
											year: "numeric",
											month: "long",
											day: "numeric",
										}
									)
									.split(",");
								$(".temp_card_text").last().text(dia[0]);
								$(
									"<div class='temp_card_icon'></div>"
								).appendTo(cardMain);
								iconSelector($(".temp_card_icon").last(), icon);
								$(
									"<div class='temp_card_text'></div>"
								).appendTo(cardMain);
								$(".temp_card_text")
									.last()
									.text(Math.round(temp) + "°");
							}
						})
						.fail(() => {
							alert("se ha producido un error;");
						});
				})
				.fail(() => {
					// error en la peticion
					alert("ciudad no encontrada");
				});
		});
	});

	// Cordova is now initialized. Have fun!
	// navigator.notification.alert("Cordova is ready!");
	// console.log("coroda " + device.cordova);
	// let element = document.getElementById("appInfo");
	// element.innerHTML =
	// 	"Cordova version: \n" +
	// 	device.cordova +
	// 	"Platfrom: \n" +
	// 	device.platform +
	// 	"Model: \n" +
	// 	device.model +
	// 	"Os version: \n" +
	// 	device.version +
	// 	navigator.geolocation.getCurrentPosition;
	// alert("hola");
}
