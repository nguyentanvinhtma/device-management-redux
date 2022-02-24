import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import './Chart.css'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const headers = {
    headers: {
        'x-access-token': localStorage.getItem("token")
    }
}

const legend = {
    display: true,
    position: "bottom",
    labels: {
        fontColor: "#323130",
        fontSize: 14
    }
};

const options = {
    title: {
        display: true,
        text: "Price of devices"
    },
    scales: {
    }
};

export default function Chart() {
    const [labels, setLabels] = useState([]);
    const [prices, setPrices] = useState([]);

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Price",
                data: prices,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            },
            // {
            //     label: "Second dataset",
            //     data: [33, 25, 35, 51, 54, 76],
            //     fill: false,
            //     borderColor: "#742774"
            // }
        ]
    };

    useEffect(() => {
        async function fetchAPI() {
            await axios.get(`http://localhost:8080/api/devices`, headers).then(res => {
                const responseData = res.data;
                const responseLabels = responseData.map(device => device.name);
                const responsePrices = responseData.map(device => device.price);

                setLabels(responseLabels);
                setPrices(responsePrices);
            })
        }
        fetchAPI();
    }, [])
    return (
        <Line id="chart" data={data} legend={legend} options={options} />
    );
}
