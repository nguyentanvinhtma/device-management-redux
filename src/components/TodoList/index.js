import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as TodoActions } from "../../store/ducks/todos";

import { FiCornerDownLeft, FiZap, FiZapOff, FiTrash } from "react-icons/fi";

class TodoList extends Component {
  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.input.value) return alert("Type something =)");

    this.props.addTodo(this.input.value);
    this.input.value = "";
  };

  render() {
    const { todos, toogleTodo, removeTodo } = this.props;

    return (
      <section>
        <h2>TODO REDUX</h2>

        <form onSubmit={this.handleSubmit}>
          <input ref={(el) => (this.input = el)} />
          <button type="submit">
            <FiCornerDownLeft />
          </button>
        </form>

        <ul>
          {todos?.map((todo) => (
            <li key={todo.id}>
              <div id="text">
                <p>{todo.complete ? <s>{todo.text}</s> : todo.text}</p>
              </div>

              <div id="actions">
                <button onClick={() => toogleTodo(todo.id)}>
                  {todo.complete ? <FiZapOff size={18} /> : <FiZap size={18} />}
                </button>
                <button onClick={() => removeTodo(todo.id)}>
                  <FiTrash size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  todos: state.todos,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(TodoActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
