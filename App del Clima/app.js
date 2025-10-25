const form = document.getElementById("form");
const inputCiudad = document.getElementById("ciudad");
const resultado = document.getElementById("resultado");
const historialDiv = document.getElementById("historial");

const apiKey = "d976dd0346d60e649ab1ce0156a22158";

function obtenerClima(ciudad) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.cod === 200) {
                resultado.innerHTML = `
                    <h2>${data.name}</h2>
                    <p>🌡️ Temperatura: ${data.main.temp}°C</p>
                    <p>🤒 Sensación térmica: ${data.main.feels_like}°C</p>
                    <p>🔼 Máx: ${data.main.temp_max}°C | 🔽 Mín: ${data.main.temp_min}°C</p>
                    <p>💧 Humedad: ${data.main.humidity}%</p>
                    <p>☁️ Estado: ${data.weather[0].description}</p>
                    <p>💨 Viento: ${data.wind.speed} m/s</p>
                `;
                
                localStorage.setItem("ultimaCiudad", data.name);
                
                guardarEnHistorial(data.name);
            } else {
                resultado.innerHTML = `<p style="color:red;">Ciudad no encontrada</p>`;
            }
        })
        .catch(err => {
            console.error(err);
            resultado.innerHTML = `<p style="color:red;">Error al obtener datos</p>`;
        });
}


function guardarEnHistorial(ciudad) {
    let historial = JSON.parse(localStorage.getItem("historial")) || [];
    if (!historial.includes(ciudad)) {
        historial.push(ciudad);
        localStorage.setItem("historial", JSON.stringify(historial));
    }
    mostrarHistorial();
}


function mostrarHistorial() {
    let historial = JSON.parse(localStorage.getItem("historial")) || [];
    historialDiv.innerHTML = "";
    historial.forEach(ciudad => {
        let btn = document.createElement("button");
        btn.textContent = ciudad;
        btn.onclick = () => obtenerClima(ciudad);
        historialDiv.appendChild(btn);
    });
}

function obtenerClimaPorUbicacion() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`;

            fetch(url)
                .then(res => res.json())
                .then(data => {
                    if (data.cod === 200) {
                        resultado.innerHTML = `
                            <h2>${data.name}</h2>
                            <p>🌡️ Temperatura: ${data.main.temp}°C</p>
                            <p>🤒 Sensación térmica: ${data.main.feels_like}°C</p>
                            <p>🔼 Máx: ${data.main.temp_max}°C | 🔽 Mín: ${data.main.temp_min}°C</p>
                            <p>💧 Humedad: ${data.main.humidity}%</p>
                            <p>☁️ Estado: ${data.weather[0].description}</p>
                            <p>💨 Viento: ${data.wind.speed} m/s</p>
                        `;
                        localStorage.setItem("ultimaCiudad", data.name);
                        guardarEnHistorial(data.name);
                    }
                })
                .catch(err => console.error(err));
        }, err => {
            console.error(err);
            resultado.innerHTML = `<p style="color:red;">No se pudo obtener la ubicación</p>`;
        });
    } else {
        resultado.innerHTML = `<p style="color:red;">Geolocalización no soportada</p>`;
    }
}

form.addEventListener("submit", e => {
    e.preventDefault();
    const ciudad = inputCiudad.value.trim();
    if (ciudad) {
        obtenerClima(ciudad);
        inputCiudad.value = "";
    }
});

window.onload = () => {
    mostrarHistorial();
    let ultimaCiudad = localStorage.getItem("ultimaCiudad");
    if (ultimaCiudad) {
        obtenerClima(ultimaCiudad);
    } else {
        obtenerClimaPorUbicacion();
    }
};
