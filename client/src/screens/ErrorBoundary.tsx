import React from 'react'

export type ErrorBoundaryProps = {
  children?: React.ReactNode
  fallback?: React.ReactNode
  fallbackComponent?: React.ComponentType<ErrorBoundaryState>
}

export type ErrorBoundaryState = {
  error: null | Error
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  render(): React.ReactNode {
    const { error } = this.state
    const { children, fallback, fallbackComponent: Component } = this.props

    if (error) {
      if (Component) {
        return <Component error={ error } />
      }

      if (fallback) {
        return fallback
      }

      return JSON.stringify(error)
    }

    return children
  }
}
