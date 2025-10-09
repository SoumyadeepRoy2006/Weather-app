import express from 'express'
import axios from 'axios'
import os from 'os'

const app = express()
const port = parseInt(process.env.PORT) ?? 2000;
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const url = "https://api.open-meteo.com/v1/forecast/";
const cities = {
	khb:{
		name: "Khoribari",
		code: "khb",
		latitude: "26.55628",
		longitude: "88.19149",
	},
	nxb:{
		name: "Naxalbari",
		code: "nxb",
		latitude: "26.6827",
		longitude: "88.22",
	},
	slg:{
		name: "Siliguri",
		code: "slg",
		latitude: "26.71",
		longitude: "88.4285",
	},
	klc:{
		name: "Kolkata",
		code: "klc",
		latitude: "28.6519",
		longitude: "77.2315",
	},
	del:{
		name: "Delhi",
		code: "del",
		latitude: "22.5626",
		longitude: "88.363",
	},
	rjs:{
		name: "Rajasthan",
		code: "rjs",
		latitude: "26.9196",
		longitude: "75.7878",
	},
}
let currentCity = cities['slg'];


app.get("/", async (req, res) => {
	try {
		if(req.query.city)
			currentCity = cities[req.query.city]
		const request = {
			params: {
				latitude: currentCity.latitude,
				longitude: currentCity.longitude,
				timezone: "Asia/Kolkata",
				current_weather: "true",
			}
		}
		const weather = await axios.get(url, request);
		const weatherData = {
			city: currentCity,
			cities: cities,
			data: weather.data.current_weather,
		}
		currentCity = cities['slg']
		res.render("index.ejs", weatherData);
	} catch (error) {
		res.render("index.ejs", { data: error.message})
	}
})

app.listen(port, () => {
	if (process.env.PORT)
		console.log(`Server live and running`);
	else {
		try {
			console.log(`Server running on IP: [${os.networkInterfaces()["Wi-Fi"][1].address}] - Port: ${port}`);
		} catch (error) { }
	}
})

