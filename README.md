<h1 align="center">
  <br>
  <img src="./www/assets/img/Samsung%20Galaxy%20Note20%205G.png" alt="icono" width="200">
  <br>
  Weather App
  <br>
</h1>

<h4 align="center">Una app del tiempo minimalista.</h4>

## Presentación

Esta app forma parte de un trabajo de la asignatura Desarrollo de interfaces del centro [Cuatrovientos](https://www.cuatrovientos.org/).
La aplicación emplea la librería JQuery con AJAX para obtener los datos, el tiempo actual y en los próximos 4 días, del api de [OpenWeather](https://openweathermap.org/),
y con [cordova](https://cordova.apache.org/) agregamos la posibilidad de obtener el tiempo con la ubicación del GPS y la apk.

## Descarga

Para clonar la aplicación necesitas [Git](https://git-scm.com) y si quieres modificar la app necesitas [Node.js](https://nodejs.org/en/download/) (que incluye [npm](http://npmjs.com)) y [cordova](https://cordova.apache.org/)

```bash
# Clone el repositorio
$ git clone https://github.com/ikerls/weather-app

$ cd weather-app

# Instalación de las dependencias
$ npm install

```

## Uso (Cordova)

```bash
# ejecutar la aplicación en el emulador de android
$ cordova run / emulate android

# ejecutar la aplicación en el navegador
$ cordova run browser

```

## Autor

Iker Larrea Sada

## Licencia

MIT
