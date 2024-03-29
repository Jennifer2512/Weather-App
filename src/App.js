import React, { useState } from 'react';
import dateBuilder from './components/date';
const api = {
	key: '',
	base: ''
};

function App() {
	const [query, setQuery] = useState('');
	const [weather, setWeather] = useState({});

	const search = (evt) => {
		if (evt.key === 'Enter') {
			fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
				.then((res) => res.json())
				.then((result) => {
					setWeather(result);
					setQuery('');
				});
		}
	};

	return (
		<div
			className={
				typeof weather.main != 'undefined'
					? weather.main.temp > 16
						? 'app warm'
						: 'app'
					: 'app'
			}
		>
			<main>
				<div className="search-box">
					<input
						className="search-bar"
						type="text"
						placeholder="Search..."
						onChange={(e) => setQuery(e.target.value)}
						value={query}
						onKeyPress={search}
					/>
				</div>
				{typeof weather.main != 'undefined' ? (
					<div>
						<div className="location-box">
							<div className="location">
								{weather.name}, {weather.sys.country}
							</div>
							<div className="date">{dateBuilder(new Date())}</div>
						</div>
						<div className="weather-box">
							<div className="temp">{Math.round(weather.main.temp)}°C</div>
							<div className="weather">{weather.weather[0].main}</div>
						</div>
					</div>
				) : (
					''
				)}
			</main>
		</div>
	);
}

export default App;
