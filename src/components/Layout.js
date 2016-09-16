import React, {Component} from 'react'
import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import Login from './Login'

class Layout extends Component {
  render() {
    const {auth, push} = this.props
    return <div>
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">PostMe</a>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li><a onClick={e => e.preventDefault() || push("/posts/public")}>Public</a></li>
              <li><a onClick={e => e.preventDefault() || push("/posts/public/best")}>Best</a></li>
              {
                auth ? <li><a onClick={e => e.preventDefault() || push("/posts/private")}>Private</a></li>
                : null
              }
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <Login />
            </ul>
          </div>
        </div>
      </nav>
      {this.props.children}
    </div>
  }
}

export default connect(({auth}) => ({auth}), {push})(Layout)
