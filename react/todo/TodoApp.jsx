import React from 'react';

import TodoHeader from './TodoHeader';
import TodoList from './TodoList';

export default React.createClass({
  getInitialState() {
    return {
      hideCompleted: false
    };
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    Meteor.subscribe('tasks');

    let tasks;

    if (this.state.hideCompleted) {
      tasks = Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}}).fetch();
    } else {
      tasks = Tasks.find({}, {sort: {createdAt: -1}}).fetch();
    }

    const incompleteCount = Tasks.find({checked: {$ne: true}}).count();

    return {
      tasks,
      incompleteCount,
      user: Meteor.user()
    };
  },

  handleToggleHideCompleted(e) {
    this.setState({ hideCompleted: e.target.checked });
  },

  componentWillMount() {
    require('./TodoApp.css');
  },

  render() {
    if (!this.data.tasks) {
      // loading
      return null;
    }

    return (
      <div className="container">
        <TodoHeader
            incompleteCount={this.data.incompleteCount}
            hideCompleted={this.state.hideCompleted}
            toggleHideCompleted={this.handleToggleHideCompleted}
        />
        <TodoList tasks={this.data.tasks} />
      </div>
    );
  }
});
