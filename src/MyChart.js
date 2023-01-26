import React, {useState} from "react";

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
import { Line } from 'react-chartjs-2';
// import { faker } from '@faker-js/faker'
import axios from "axios";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const MyChart = () => {


	const [ coinData, setCoinData ] = useState([])

	const [ days, setDays ] = useState(1);

	const url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}&interval=${days === 1 ? "minutely" : "daily"}`

	// const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}&interval=${days === 1 ? "minutely" : "daily"}`

	axios.get(url)
		.then(res => {
			console.log(res.data);
			setCoinData(res.data.prices)
		})
		.catch(err => console.log(err))

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'bottom',
			},
			title: {
				display: true,
				text: 'Bitcoin history',
			},
		},
	};

	// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

	const labels = coinData.map((coin) => {
		let date = new Date(coin[0]);
		let time = `${date.getHours()}:${date.getMinutes()}`
		// let time = date.getHours() + ":" + date.getMinutes();

		return days === 1 ? time : date.toLocaleDateString();
	})

	const data = {
		labels,
		datasets: [
			// {
			//   label: 'Dataset 1',
			//   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
			//   borderColor: 'rgb(255, 99, 132)',
			//   backgroundColor: 'rgba(255, 99, 132, 0.5)',
			// },
			// {
			//   label: 'Dataset 2',
			//   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
			//   borderColor: 'rgb(53, 162, 235)',
			//   backgroundColor: 'rgba(53, 162, 235, 0.5)',
			// },
			{
				label: 'bitcoin',
				data:coinData.map((coin) => coin[1]),
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			}
		],
	};

	return(
		<>
			<h3>From MyChart</h3>
			{/* <Line */}
			{/* 	data={{ */}
			{/* labels: coinData.prices.map((coin) => { */}
			{/* 	let date = new Date(coin[0]); */}
			{/* 	let time = `${date.getHours()}:${date.getMinutes()}` */}

			{/* 	return days === 1 ? time : date.toLocaleDateString(); */}
			{/* }), */}

			{/* 		datasets: [ */}
			{/* 			{date:coinData.prices.map((coin) => coin[1])} */}
			{/* 		] */}
			{/* 	}} */}

			{/* /> */}

			<Line options={options} data={data} />

			<button onClick={() => setDays(1)}>Today</button>
			<button onClick={() => setDays(7)}>7 Days</button>
			<button onClick={() => setDays(30)}>30 Days</button>
			<button onClick={() => setDays(122)}>6 Months</button>
			<button onClick={() => setDays(365)}>1 Year</button>
		</>
	)
}

export default MyChart;
