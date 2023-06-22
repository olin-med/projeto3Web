var mymap = L.map('map').setView([-23.555797392918087, -46.73375273135423], 13); // Inicializa o mapa com um ponto inicial

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(mymap);

var markers = [];
function acharChoquePlaca() { //Aqui reconheço um elemento no HTML para realizar a consulta de choque por placa do vagão
    var user = {
        placa: document.getElementById('placa').value,
    }
    fetch('http://localhost:9696/choqueVagao', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            markers.forEach(marker => mymap.removeLayer(marker));
            markers = [];
            data.rows.forEach(item => {
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay; // Subtract 1 to adjust for Excel's base date
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
        <strong>Data e Hora:</strong> ${formattedDateTime}<br>
        <strong>Latitude:</strong> ${item.Latitude}<br>
        <strong>Longitude:</strong> ${item.Longitude}<br>
        <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
        <strong>Placa:</strong> ${item.placa}<br>
        <strong>Trecho:</strong> ${item.Trecho}<br>
        <strong>Força Máxima:</strong> ${item['Fmaxima-tf']} tf<br>
        <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
        <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
        <strong>Viagem:</strong> ${item.viagem}<br>
        <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
        <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
    `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);
            });
        })
        .catch(err => console.log(err));
    fetch('http://localhost:9696/picoVagao', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            data.rows.forEach(item => {
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay; // Subtract 1 to adjust for Excel's base date
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
            <strong>Data e Hora:</strong> ${formattedDateTime}<br>
            <strong>Latitude:</strong> ${item.Latitude}<br>
            <strong>Longitude:</strong> ${item.Longitude}<br>
            <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
            <strong>Placa:</strong> ${item.placa}<br>
            <strong>Trecho:</strong> ${item.Trecho}<br>
            <strong>deltaT:</strong> ${item.deltaT} tf<br>
            <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
            <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
            <strong>Viagem:</strong> ${item.viagem}<br>
            <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
            <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
        `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);
            });
        })
        .catch(err => console.log(err));
}

function engateE() {
    var user = {
        tipo_engate: 'E',
    }
    fetch('http://localhost:9696/choqueEngate', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            markers.forEach(marker => mymap.removeLayer(marker));
            markers = [];
            data.rows.forEach(item => {
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay; // Subtract 1 to adjust for Excel's base date
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
        <strong>Data e Hora:</strong> ${formattedDateTime}<br>
        <strong>Latitude:</strong> ${item.Latitude}<br>
        <strong>Longitude:</strong> ${item.Longitude}<br>
        <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
        <strong>Placa:</strong> ${item.placa}<br>
        <strong>Trecho:</strong> ${item.Trecho}<br>
        <strong>Força Máxima:</strong> ${item['Fmaxima-tf']} tf<br>
        <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
        <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
        <strong>Viagem:</strong> ${item.viagem}<br>
        <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
        <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
    `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);
            });
        })
        .catch(err => console.log(err));
    fetch('http://localhost:9696/picoEngate', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            data.rows.forEach(item => {
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay; // Subtract 1 to adjust for Excel's base date
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
            <strong>Data e Hora:</strong> ${formattedDateTime}<br>
            <strong>Latitude:</strong> ${item.Latitude}<br>
            <strong>Longitude:</strong> ${item.Longitude}<br>
            <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
            <strong>Placa:</strong> ${item.placa}<br>
            <strong>Trecho:</strong> ${item.Trecho}<br>
            <strong>deltaT:</strong> ${item.deltaT} tf<br>
            <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
            <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
            <strong>Viagem:</strong> ${item.viagem}<br>
            <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
            <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
        `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);   
            });
        })
        .catch(err => console.log(err));
}

function engateF() {
    var user = {
        tipo_engate: 'F',
    }
    fetch('http://localhost:9696/choqueEngate', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            markers.forEach(marker => mymap.removeLayer(marker));
            markers = [];
            data.rows.forEach(item => {
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay; // Subtract 1 to adjust for Excel's base date
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
            <strong>Data e Hora:</strong> ${formattedDateTime}<br>
            <strong>Latitude:</strong> ${item.Latitude}<br>
            <strong>Longitude:</strong> ${item.Longitude}<br>
            <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
            <strong>Placa:</strong> ${item.placa}<br>
            <strong>Trecho:</strong> ${item.Trecho}<br>
            <strong>Força Máxima:</strong> ${item['Fmaxima-tf']} tf<br>
            <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
            <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
            <strong>Viagem:</strong> ${item.viagem}<br>
            <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
            <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
        `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);
            });
        })
        .catch(err => console.log(err));
    fetch('http://localhost:9696/picoEngate', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            data.rows.forEach(item => {
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay; // Subtract 1 to adjust for Excel's base date
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
            <strong>Data e Hora:</strong> ${formattedDateTime}<br>
            <strong>Latitude:</strong> ${item.Latitude}<br>
            <strong>Longitude:</strong> ${item.Longitude}<br>
            <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
            <strong>Placa:</strong> ${item.placa}<br>
            <strong>Trecho:</strong> ${item.Trecho}<br>
            <strong>deltaT:</strong> ${item.deltaT} tf<br>
            <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
            <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
            <strong>Viagem:</strong> ${item.viagem}<br>
            <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
            <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
        `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);
            });
        })
        .catch(err => console.log(err));
}

function v1() {
    let user = {
        viagem: 1
    }
    fetch('http://localhost:9696/choqueViagem', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            markers.forEach(marker => mymap.removeLayer(marker));
            markers = [];
            data.rows.forEach(item => {
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay; // Subtract 1 to adjust for Excel's base date
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
            <strong>Data e Hora:</strong> ${formattedDateTime}<br>
            <strong>Latitude:</strong> ${item.Latitude}<br>
            <strong>Longitude:</strong> ${item.Longitude}<br>
            <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
            <strong>Placa:</strong> ${item.placa}<br>
            <strong>Trecho:</strong> ${item.Trecho}<br>
            <strong>Força Máxima:</strong> ${item['Fmaxima-tf']} tf<br>
            <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
            <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
            <strong>Viagem:</strong> ${item.viagem}<br>
            <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
            <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
        `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);
            });
        })
        .catch(err => console.log(err));
    fetch('http://localhost:9696/picoViagem', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            data.rows.forEach(item => {
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay; // Subtract 1 to adjust for Excel's base date
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
            <strong>Data e Hora:</strong> ${formattedDateTime}<br>
            <strong>Latitude:</strong> ${item.Latitude}<br>
            <strong>Longitude:</strong> ${item.Longitude}<br>
            <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
            <strong>Placa:</strong> ${item.placa}<br>
            <strong>Trecho:</strong> ${item.Trecho}<br>
            <strong>deltaT:</strong> ${item.deltaT} tf<br>
            <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
            <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
            <strong>Viagem:</strong> ${item.viagem}<br>
            <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
            <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
        `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);
            });
        })
        .catch(err => console.log(err));
}

function v2() {
    let user = {
        viagem: 2
    }
    fetch('http://localhost:9696/choqueViagem', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            markers.forEach(marker => mymap.removeLayer(marker));
            markers = [];
            data.rows.forEach(item => {
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay; // Subtract 1 to adjust for Excel's base date
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
            <strong>Data e Hora:</strong> ${formattedDateTime}<br>
            <strong>Latitude:</strong> ${item.Latitude}<br>
            <strong>Longitude:</strong> ${item.Longitude}<br>
            <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
            <strong>Placa:</strong> ${item.placa}<br>
            <strong>Trecho:</strong> ${item.Trecho}<br>
            <strong>Força Máxima:</strong> ${item['Fmaxima-tf']} tf<br>
            <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
            <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
            <strong>Viagem:</strong> ${item.viagem}<br>
            <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
            <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
        `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);
            });
        })
        .catch(err => console.log(err));
    fetch('http://localhost:9696/picoViagem', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            data.rows.forEach(item => {
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay; // Subtract 1 to adjust for Excel's base date
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
            <strong>Data e Hora:</strong> ${formattedDateTime}<br>
            <strong>Latitude:</strong> ${item.Latitude}<br>
            <strong>Longitude:</strong> ${item.Longitude}<br>
            <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
            <strong>Placa:</strong> ${item.placa}<br>
            <strong>Trecho:</strong> ${item.Trecho}<br>
            <strong>deltaT:</strong> ${item.deltaT} tf<br>
            <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
            <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
            <strong>Viagem:</strong> ${item.viagem}<br>
            <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
            <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
        `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);
            });
        })
        .catch(err => console.log(err));
}

function v3() {
    let user = {
        viagem: 3
    }
    fetch('http://localhost:9696/choqueViagem', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            markers.forEach(marker => mymap.removeLayer(marker));
            markers = [];
            data.rows.forEach(item => {
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay; // Subtract 1 to adjust for Excel's base date
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
            <strong>Data e Hora:</strong> ${formattedDateTime}<br>
            <strong>Latitude:</strong> ${item.Latitude}<br>
            <strong>Longitude:</strong> ${item.Longitude}<br>
            <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
            <strong>Placa:</strong> ${item.placa}<br>
            <strong>Trecho:</strong> ${item.Trecho}<br>
            <strong>Força Máxima:</strong> ${item['Fmaxima-tf']} tf<br>
            <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
            <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
            <strong>Viagem:</strong> ${item.viagem}<br>
            <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
            <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
        `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);
            });
        })
        .catch(err => console.log(err));
    fetch('http://localhost:9696/picoViagem', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            data.rows.forEach(item => {
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay; // Subtract 1 to adjust for Excel's base date
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
            <strong>Data e Hora:</strong> ${formattedDateTime}<br>
            <strong>Latitude:</strong> ${item.Latitude}<br>
            <strong>Longitude:</strong> ${item.Longitude}<br>
            <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
            <strong>Placa:</strong> ${item.placa}<br>
            <strong>Trecho:</strong> ${item.Trecho}<br>
            <strong>deltaT:</strong> ${item.deltaT} tf<br>
            <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
            <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
            <strong>Viagem:</strong> ${item.viagem}<br>
            <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
            <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
        `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);
            });
        })
        .catch(err => console.log(err));
}

function v4() {
    let user = {
        viagem: 4
    }
    fetch('http://localhost:9696/choqueViagem', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            markers.forEach(marker => mymap.removeLayer(marker));
            markers = [];
            data.rows.forEach(item => {
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay; // Subtract 1 to adjust for Excel's base date
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
            <strong>Data e Hora:</strong> ${formattedDateTime}<br>
            <strong>Latitude:</strong> ${item.Latitude}<br>
            <strong>Longitude:</strong> ${item.Longitude}<br>
            <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
            <strong>Placa:</strong> ${item.placa}<br>
            <strong>Trecho:</strong> ${item.Trecho}<br>
            <strong>Força Máxima:</strong> ${item['Fmaxima-tf']} tf<br>
            <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
            <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
            <strong>Viagem:</strong> ${item.viagem}<br>
            <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
            <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
        `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);
            });
        })
        .catch(err => console.log(err));
    fetch('http://localhost:9696/picoViagem', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            data.rows.forEach(item => {
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay; // Subtract 1 to adjust for Excel's base date
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
            <strong>Data e Hora:</strong> ${formattedDateTime}<br>
            <strong>Latitude:</strong> ${item.Latitude}<br>
            <strong>Longitude:</strong> ${item.Longitude}<br>
            <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
            <strong>Placa:</strong> ${item.placa}<br>
            <strong>Trecho:</strong> ${item.Trecho}<br>
            <strong>deltaT:</strong> ${item.deltaT} tf<br>
            <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
            <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
            <strong>Viagem:</strong> ${item.viagem}<br>
            <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
            <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
        `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);
            });
        })
        .catch(err => console.log(err));
}

function v5() {
    let user = {
        viagem: 5
    }
    fetch('http://localhost:9696/choqueViagem', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            markers.forEach(marker => mymap.removeLayer(marker));
            markers = [];
            data.rows.forEach(item => {
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay; // Subtract 1 to adjust for Excel's base date
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
            <strong>Data e Hora:</strong> ${formattedDateTime}<br>
            <strong>Latitude:</strong> ${item.Latitude}<br>
            <strong>Longitude:</strong> ${item.Longitude}<br>
            <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
            <strong>Placa:</strong> ${item.placa}<br>
            <strong>Trecho:</strong> ${item.Trecho}<br>
            <strong>Força Máxima:</strong> ${item['Fmaxima-tf']} tf<br>
            <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
            <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
            <strong>Viagem:</strong> ${item.viagem}<br>
            <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
            <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
        `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);
            });
        })
        .catch(err => console.log(err));
    fetch('http://localhost:9696/picoViagem', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            data.rows.forEach(item => {
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay; // Subtract 1 to adjust for Excel's base date
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
            <strong>Data e Hora:</strong> ${formattedDateTime}<br>
            <strong>Latitude:</strong> ${item.Latitude}<br>
            <strong>Longitude:</strong> ${item.Longitude}<br>
            <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
            <strong>Placa:</strong> ${item.placa}<br>
            <strong>Trecho:</strong> ${item.Trecho}<br>
            <strong>deltaT:</strong> ${item.deltaT} tf<br>
            <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
            <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
            <strong>Viagem:</strong> ${item.viagem}<br>
            <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
            <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
        `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);
            });
        })
        .catch(err => console.log(err));
}