import { Component, PropTypes } from 'react';
import TodoApp from './todo/TodoApp';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  render() {
    return this.props.children;
  }
}
