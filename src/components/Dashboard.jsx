import ErrorBoundary from './ErrorBoundary.jsx'
import WeatherWidget from './WeatherWidget.jsx'

const FEED_ITEMS = [
  'Profile activity keeps rendering even if the widget crashes.',
  'Messages stay reachable during every test case.',
  'Recent updates remain visible while the boundary handles errors.',
]

const PROFILE_STATS = [
  { value: '18', label: 'Posts today' },
  { value: '92%', label: 'Reply rate' },
  { value: '4.9', label: 'Member score' },
]

const NORMAL_SIGNALS = [
  'Weather widget stays visible',
  'Feed and profile remain unchanged',
  'No fallback message appears',
]

const EDGE_SIGNALS = [
  'Fallback UI replaces the widget',
  'Feed and profile remain unchanged',
  'The rest of the page still renders',
]

function Dashboard({ currentTestKey, activeTest }) {
  const activeSignals =
    activeTest.type === 'normal' ? NORMAL_SIGNALS : EDGE_SIGNALS

  return (
    <main className="dashboard-grid">
      <section className="widget-card feed-card">
        <p className="widget-kicker">Feed Overview</p>
        <h2>Community dashboard</h2>
        <p className="section-copy">
          The feed and profile panels act as the stable part of the page during
          every weather test.
        </p>
        <ul>
          {FEED_ITEMS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="widget-card monitor-card">
        <p className="widget-kicker">Boundary Monitor</p>
        <h2>{activeTest.type === 'normal' ? 'Normal render path' : 'Fallback path'}</h2>
        <p className="section-copy">{activeTest.expectedState}</p>
        <div className={`monitor-pill ${activeTest.type}`}>
          <span className="monitor-dot" />
          {activeTest.type === 'normal'
            ? 'Widget should stay visible'
            : 'Fallback should appear here'}
        </div>
      </section>

      <section className="widget-card profile-card">
        <p className="widget-kicker">Profile Snapshot</p>
        <h2>Jordan Lee</h2>
        <p>Moderator for the local community board.</p>
        <div className="profile-stats">
          {PROFILE_STATS.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <ErrorBoundary
        resetKey={currentTestKey}
        testTitle={activeTest.buttonTitle}
      >
        <WeatherWidget weather={activeTest.weather} />
      </ErrorBoundary>

      <section className={`widget-card current-case-card ${activeTest.type}`}>
        <p className="widget-kicker">Current Test</p>
        <h2>{activeTest.title}</h2>
        <p className="section-copy">{activeTest.description}</p>
      </section>

      <section className="widget-card signal-card">
        <p className="widget-kicker">What To Look For</p>
        <h2>{activeTest.expectedState}</h2>
        <ul className="signal-list">
          {activeSignals.map((signal) => (
            <li key={signal}>{signal}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Dashboard
