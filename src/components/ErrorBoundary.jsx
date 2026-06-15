import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false })
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="widget-card fallback-card" aria-live="polite">
          <p className="widget-kicker">Weather Widget</p>
          <div className="card-topline">
            <span className="state-chip edge">Fallback active</span>
            <span className="subtle-label">{this.props.testTitle}</span>
          </div>
          <h3>Weather widget is temporarily unavailable.</h3>
          <p>The rest of the dashboard is still working.</p>
          <p className="fallback-note">
            This broken state is isolated by the Error Boundary.
          </p>
        </section>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
