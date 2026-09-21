import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <main className="wrap narrow" style={{ padding: "80px 0" }}>
        <p className="kicker">Something broke</p>
        <h1>This screen hit an error.</h1>
        <p>Reload the page. Your demo data is still in this browser unless you cleared it.</p>
        <p className="btns">
          <button className="btn btn-main" type="button" onClick={() => window.location.reload()}>Reload</button>
          <a className="btn btn-ghost" href="/">Go home</a>
        </p>
      </main>
    );
  }
}
