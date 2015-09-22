import React from 'react';
import TodoItem from './TodoItem';

const TodoList = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch()
    };
  },

  render() {
    return (
      <ul>
        {this.data.tasks.map(task => <TodoItem task={task} />)}
      </ul>
    );
  }
});

export default TodoList;