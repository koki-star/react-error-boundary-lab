function WeatherWidget({ weather }) {
  if (!weather) {
    throw new Error('Missing weather data')
  }

  const { city, temperature, condition } = weather

  if (typeof city !== 'string' || city.trim() === '') {
    throw new Error('Invalid city value')
  }

  if (typeof condition !== 'string' || condition.trim() === '') {
    throw new Error('Invalid condition value')
  }

  if (typeof temperature !== 'number' || Number.isNaN(temperature)) {
    throw new Error('Invalid temperature value')
  }

  const temperatureLabel =
    temperature <= 32 ? 'Cold alert' : temperature >= 95 ? 'Heat alert' : 'Steady weather'
  const comfortLabel =
    temperature <= 32
      ? 'Bundle up'
      : temperature >= 95
        ? 'Stay hydrated'
        : 'Comfortable conditions'

  return (
    <section className="widget-card weather-card">
      <p className="widget-kicker">Weather Widget</p>
      <div className="card-topline">
        <span className="state-chip normal">Live data</span>
        <span className="subtle-label">Ready to render</span>
      </div>
      <h3>{city}</h3>
      <p className="weather-temp">{temperature}°F</p>
      <div className="weather-meta">
        <span>{condition}</span>
        <span>{temperatureLabel}</span>
      </div>
      <div className="weather-detail-row">
        <div>
          <small>Guidance</small>
          <strong>{comfortLabel}</strong>
        </div>
        <div>
          <small>Status</small>
          <strong>Widget healthy</strong>
        </div>
      </div>
    </section>
  )
}

export default WeatherWidget
