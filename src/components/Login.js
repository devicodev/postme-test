import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import {Template} from 'meteor/templating'
import {Blaze} from 'meteor/blaze'

class Login extends Component {
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(Template._loginButtons,
      this.refs.container.parentNode)
  }

  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  }
  render() {
    // Just render a placeholder container that will be filled in
    return <span ref="container" />;
  }
}

export default Login