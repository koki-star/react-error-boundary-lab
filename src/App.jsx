import { useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard.jsx'

const TEST_CASES = {
  normal1: {
    buttonLabel: 'Normal Test 1',
    buttonTitle: 'Valid weather data',
    title: 'Current Test: Normal Test 1 - Valid weather data',
    type: 'normal',
    description: 'Weather widget shows city, temperature, and condition.',
    expectedState: 'Weather widget renders normally.',
    weather: {
      city: 'San Diego',
      temperature: 72,
      condition: 'Sunny',
    },
  },
  normal2: {
    buttonLabel: 'Normal Test 2',
    buttonTitle: 'Cold weather data',
    title: 'Current Test: Normal Test 2 - Cold weather data',
    type: 'normal',
    description: 'Weather widget still renders correctly with a low temperature.',
    expectedState: 'Weather widget renders normally.',
    weather: {
      city: 'Denver',
      temperature: 28,
      condition: 'Snow',
    },
  },
  normal3: {
    buttonLabel: 'Normal Test 3',
    buttonTitle: 'Hot weather data',
    title: 'Current Test: Normal Test 3 - Hot weather data',
    type: 'normal',
    description: 'Weather widget still renders correctly with a high temperature.',
    expectedState: 'Weather widget renders normally.',
    weather: {
      city: 'Phoenix',
      temperature: 104,
      condition: 'Hot',
    },
  },
  edge1: {
    buttonLabel: 'Edge Test 1',
    buttonTitle: 'Corrupted data',
    title: 'Current Test: Edge Test 1 - Corrupted data',
    type: 'edge',
    description:
      'Error Boundary catches the render crash and shows fallback UI.',
    expectedState: 'Fallback UI replaces the weather widget.',
    weather: {
      city: 'Seattle',
      temperature: 58,
      condition: 404,
    },
  },
  edge2: {
    buttonLabel: 'Edge Test 2',
    buttonTitle: 'Missing weather object',
    title: 'Current Test: Edge Test 2 - Missing weather object',
    type: 'edge',
    description:
      'Error Boundary catches the render crash and shows fallback UI.',
    expectedState: 'Fallback UI replaces the weather widget.',
    weather: null,
  },
  edge3: {
    buttonLabel: 'Edge Test 3',
    buttonTitle: 'Invalid temperature value',
    title: 'Current Test: Edge Test 3 - Invalid temperature value',
    type: 'edge',
    description:
      'Error Boundary catches the render crash and shows fallback UI.',
    expectedState: 'Fallback UI replaces the weather widget.',
    weather: {
      city: 'Miami',
      temperature: 'warm',
      condition: 'Humid',
    },
  },
}

const TEST_GROUPS = [
  {
    title: 'Normal cases',
    hint: 'Healthy data should render the widget without interruption.',
    keys: ['normal1', 'normal2', 'normal3'],
  },
  {
    title: 'Edge cases',
    hint: 'Broken data should trigger the fallback and keep the rest online.',
    keys: ['edge1', 'edge2', 'edge3'],
  },
]

function App() {
  const [currentTestKey, setCurrentTestKey] = useState('normal1')
  const activeTest = TEST_CASES[currentTestKey]
  const stats = [
    { label: 'Demo cases', value: '6' },
    { label: 'Safe renders', value: '3' },
    { label: 'Crash checks', value: '3' },
  ]

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="hero-copy">
          <div>
            <p className="eyebrow">Error Boundary Pattern</p>
            <h1>Dashboard stays online even when one widget breaks</h1>
          </div>
          <p className="header-copy">
            Switch between normal and edge cases to show that only the weather
            widget fails while the rest of the page keeps rendering.
          </p>
        </div>

        <div className="hero-stats" aria-label="Project summary">
          {stats.map((item) => (
            <div key={item.label} className="hero-stat">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </header>

      <div className="experience-grid">
        <section className="test-panel" aria-label="Test case controls">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Control Center</p>
              <h2>Run test cases</h2>
            </div>
            <p>Switch between six test cases to compare healthy and broken states.</p>
          </div>

          <div className="test-groups">
            {TEST_GROUPS.map((group) => (
              <section key={group.title} className="test-group">
                <div className="test-group-copy">
                  <h3>{group.title}</h3>
                  <p>{group.hint}</p>
                </div>

                <div className="button-grid">
                  {group.keys.map((key) => {
                    const testCase = TEST_CASES[key]

                    return (
                      <button
                        key={key}
                        type="button"
                        className={key === currentTestKey ? 'is-active' : ''}
                        onClick={() => setCurrentTestKey(key)}
                      >
                        <span className="button-label">{testCase.buttonLabel}</span>
                        <strong>{testCase.buttonTitle}</strong>
                      </button>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        </section>

        <Dashboard currentTestKey={currentTestKey} activeTest={activeTest} />
      </div>
    </div>
  )
}

export default App
