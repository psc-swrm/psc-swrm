// @SCM This is the tab where I think we can demo connecting the realtime 'guage' to the last temp reading whereas the bar chart could show some view of
// the historical data?

function initPerformanceTab(mainViewer) {

    let viewerrepresentation = true;
    let colors = [];
    
    google.charts.setOnLoadCallback(drawGaugeChart);
      let gaugechart,gaugeoptions,gaugedata;  
      function drawGaugeChart() {

        gaugedata = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          ['temp', 0]
        ]);

        gaugeoptions = {min:0,max:200,
          width: 160, height: 160,
          greenFrom: 0, greenTo: 25,
          redFrom: 51, redTo: 200,
          yellowFrom:26, yellowTo: 50,
          minorTicks: 5,majorTicks: ['0', '50', '100', '150', '200']
        };
        gaugechart = new google.visualization.Gauge(document.getElementById('gauge_chart'));
        gaugechart.draw(gaugedata, gaugeoptions);
    }

    drawGaugeChart();
    
    let red = new THREE.Vector4(1, 0, 0, 0.5);
    let orange = new THREE.Vector4(1, 0.6, 0, 0.5);
    let green = new THREE.Vector4(0.2, 0.8, 0.2, 0.5);
    let redbar = "rgba(255, 0, 0,0.7)";
    let orangebar = "rgba(255,165,0,0.7)";
    let greenbar = "rgba(0, 128, 0,0.7)";

    function createPartTemperaturesChart() {
        const ctx = document.getElementById('part-temperatures-chart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["1", "2", "3", "4", "5", "6","7", "8", "9", "10", "11", "12","13", "14", "15", "16", "17", "18","19", "20", "21", "22", "23", "24","25"],
                datasets: [{
                    label: 'Temp',
                    data: [],
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        return chart;
    }  
    
    function createEngineSpeedChart() {
        const ctx = document.getElementById('engine-speed-chart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Speed [rpm]',
                    borderColor: 'rgba(255, 196, 0, 1.0)',
                    backgroundColor: 'rgba(255, 196, 0, 0.5)',
                    data: []
                }]
            },
            options: {
                scales: {
                    xAxes: [{ type: 'realtime', realtime: { delay: 2000 } }],
                    yAxes: [{ ticks: { beginAtZero: true } }]
                }
            }
        });
        return chart;
    }

    function createEngineVibrationsChart() {
        const ctx = document.getElementById('engine-vibrations-chart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Min [mm/s]',
                    borderColor: 'rgba(255, 192, 0, 1.0)',
                    backgroundColor: 'rgba(255, 192, 0, 0.5)',
                    data: []
                },{
                    label: 'Avg [mm/s]',
                    borderColor: 'rgba(192, 128, 0, 1.0)',
                    backgroundColor: 'rgba(192, 128, 0, 0.5)',
                    data: []
                },{
                    label: 'Max [mm/s]',
                    borderColor: 'rgba(128, 64, 0, 1.0)',
                    backgroundColor: 'rgba(128, 64, 0, 0.5)',
                    data: []
                }]
            },
            options: {
                scales: {
                    xAxes: [{ type: 'realtime', realtime: { delay: 2000 } }],
                    yAxes: [{ ticks: { beginAtZero: true } }]
                }
            }
        });
        return chart;
    }

    function refreshEngineVibrations(chart) {
        const date = Date.now();
        const minVibration = 2.0 + Math.random();
        const maxVibration = minVibration + Math.random();
        chart.data.datasets[0].data.push({ x: date, y: minVibration });
        chart.data.datasets[1].data.push({ x: date, y: 0.5 * (minVibration + maxVibration) });
        chart.data.datasets[2].data.push({ x: date, y: maxVibration });
    }

    function updateTemperatureAlertForm(partIds) {
        $form = $('#temperature-alert-form');
        if (!partIds || partIds.length !== 1) {
            $form.fadeOut();
        } else {
            $('#temperature-alert-part').val(partIds[0]);
            const config = alerts[partIds[0]];
            if (config && config.temperature && config.temperature.max) {
                $('#temperature-alert-max').val(config.temperature.max);
            } else {
                $('#temperature-alert-max').val('');
            }
            $form.fadeIn();
        }
    }

    const engineSpeedChart = createEngineSpeedChart();
    const engineVibrationsChart = createEngineVibrationsChart();
    const partTemperaturesChart = createPartTemperaturesChart();
    
    const $partSelectionAlert = $('#performance-part div.alert');
    const $partTemperatureChart = $('#part-temperatures-chart');
    let sensordata;

    function getCollectionName() {
        return $('#collectionselected').val()
    }

    let waterdata;
    loadData()
    async function loadData(){
        let collectionname = getCollectionName();
        let response = await fetch('/api/monitor/sensordata?name='+collectionname);
        sensordata = await response.json();
        waterdata = [{"name":"Stepper_XAxis","info":{"dbid":[573],"sum":0,"tempdata":[],"tempavg":0}},{"name":"Stepper_YAxis","info":{"dbid":[1333],"sum":0,"tempdata":[],"tempavg":0}},{"name":"Stepper_ZAxis","info":{"dbid":[425],"sum":0,"tempdata":[],"tempavg":0}},{"name":"Stepper_BAxis","info":{"dbid":[1312],"sum":0,"tempdata":[],"tempavg":0}},{"name":"StockMaterial","info":{"dbid":[2084],"sum":0,"tempdata":[],"tempavg":0}},{"name":"CuttingTool","info":{"dbid":[2086],"sum":0,"tempdata":[],"tempavg":0}},{"name":"SpindleMotor","info":{"dbid":[255],"sum":0,"tempdata":[],"tempavg":0}}]
        for (let index = 0; index < sensordata.length; index++) {
            let key = sensordata[index].sensor_name;
            if(sensordata[index].temperature === undefined) continue;
            switch (key) {
                case "Stepper_XAxis":
                    temperaturedata[0].info.tempdata.push(sensordata[index].temperature);
                    temperaturedata[0].info.sum += sensordata[index].temperature;
                    break;
                case "Stepper_YAxis":
                    temperaturedata[1].info.tempdata.push(sensordata[index].temperature)
                    temperaturedata[1].info.sum += sensordata[index].temperature;
                    break;
                case "Stepper_ZAxis":
                    temperaturedata[2].info.tempdata.push(sensordata[index].temperature)
                    temperaturedata[2].info.sum += sensordata[index].temperature;
                    break;
                case "Stepper_BAxis":
                    temperaturedata[3].info.tempdata.push(sensordata[index].temperature)
                    temperaturedata[3].info.sum += sensordata[index].temperature;
                    break;
                case "StockMaterial":
                    temperaturedata[4].info.tempdata.push(sensordata[index].temperature)
                    temperaturedata[4].info.sum += sensordata[index].temperature;
                    break;
                case "CuttingTool":
                    temperaturedata[5].info.tempdata.push(sensordata[index].temperature)
                    temperaturedata[5].info.sum += sensordata[index].temperature;
                    break;
                case "SpindleMotor":
                    temperaturedata[6].info.tempdata.push(sensordata[index].temperature)
                    temperaturedata[6].info.sum += sensordata[index].temperature;
                    break;            
                default:
                    break;
            }
            
        }
        for (let j = 0; j < temperaturedata.length; j++) {
            temperaturedata[j].info.tempavg = parseFloat((temperaturedata[j].info.sum/temperaturedata[j].info.tempdata.length).toFixed(2));            
        }
        // console.log(temperaturedata)
        updatePartTemperatures(temperaturedata)
    }
    function updatePartTemperatures(temperaturedata) {
        if (viewerrepresentation) {            
            for (let i = 0; i < temperaturedata.length; i++) {
                setColor(temperaturedata[i].info.dbid,temperaturedata[i].info.tempavg);            
            }
        }
        let index = parseInt($( "#partselected" ).val());
        showInfo(index)
        $partTemperatureChart.show();
    }
    function showInfo(index) {
        let info = temperaturedata[index].info;
        partTemperaturesChart.data.datasets[0].data = info.tempdata;
        let bars = info.tempdata;
        colors = [];
        for(i=0;i<bars.length;i++){
            let color;
            let temp = bars[i]
            if (temp<=25) {
                color = greenbar;
            } else if (temp>25 && temp <=50){
                color = orangebar;
            }else{
                color = redbar;
            }
            colors.push(color);
        }
        gaugedata.setValue(0, 1, bars[0]);
        gaugechart.draw(gaugedata, gaugeoptions);
        partTemperaturesChart.data.datasets[0].backgroundColor = colors;
        partTemperaturesChart.data.datasets[0].borderColor = colors;
        partTemperaturesChart.update();
    }
    mainViewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, function(ev) {
        let dbid = mainViewer.getSelection()[0];
        if(dbid === undefined) return;
        let index = getIndexFromDbid(dbid);
        $( "#partselected" ).val(index);
        mainViewer.fitToView(temperaturedata[index].info.dbid)
        mainViewer.clearSelection();
        if(index !== -1) showInfo(index); 
    });

    function getIndexFromDbid(dbid) {
        for (let i = 0; i < temperaturedata.length; i++) {
            if(temperaturedata[i].info.dbid[0] === dbid) return i;            
        }
        return -1;
    }
    function setColor(dbid,avgtemp) {
        let color;
        if (avgtemp<=25) {
            color = green;
        } else if (avgtemp>25 && avgtemp <=50){
            color = orange;
        }else{
            color = red;
        }
        mainViewer.clearSelection();
        mainViewer.setThemingColor(dbid,color);
    }
    
    $( "#partselected" ).on('change', function() {
        showInfo(this.value)
      });
    
    $( "#viewer_representation" ).on('change', function() {
        if (this.checked) {
            viewerrepresentation = true;
        } else {
            viewerrepresentation = false;
            mainViewer.clearThemingColors();
        }
    });

    $partTemperatureChart.hide();
    setInterval(function() { loadData() }, 5000);
}
