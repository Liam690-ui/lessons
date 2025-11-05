
import { Chart, registerables } from "chart.js";

Chart.register(...registerables)

const cl = console.log;


const ctx = document.getElementById('myChart').getContext('2d');
cl(ctx)
const chart = new Chart(ctx,{
    type: "line",
    data: {
        labels: ['Jan','Feb','Mar','Apr'],
        datasets:[{
            label: 'My First Label',
            backgroundColor: 'rgb(255,99,132)',
            borderColor: 'rgb(255,99,132)',
            data:[8,12,4,7],
            fill:true
        }]
    },
    options: {}
})
