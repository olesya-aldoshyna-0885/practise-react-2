import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
    isEditing: false,
    currentTodo: {},
  };

  componentDidMount = () => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      this.setState({ todos: savedTodos });
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { todos } = this.state;
    if (prevState.todos !== todos) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  };

  handleOnSubmit = value => {
    const todo = {
      id: nanoid(),
      text: value,
    };

    this.setState(({ todos }) => ({ todos: [...todos, todo] }));
  };

  deleteToDo = todoId => {
    this.setState(({ todos }) => ({
      todos: todos.filter(todo => todo.id !== todoId),
    }));
  };

  handleEdit = todo => {
    this.setState({ isEditing: true, currentTodo: { ...todo } });
  };

  handleCancel = () => {
    this.setState({ isEditing: false });
  };

  handleInputEditChange = event => {
    const { currentTodo } = this.state;
    this.setState({
      currentTodo: { ...currentTodo, text: event.currentTarget.value },
    });
  };

  handleFormUpdate = event => {
    event.preventDefault();
    const { currentTodo, todos } = this.state;
    if (currentTodo.text === '') {
      return alert('Enter message!');
    }
    const change = todos.map(todo => {
      return todo.id === currentTodo.id ? currentTodo : todo;
    });
    this.setState({ todos: change, isEditing: false });
  };

  render() {
    const { isEditing, currentTodo } = this.state;
    return (
      <>
        {isEditing ? (
          <EditForm
            currentTodo={currentTodo}
            onCancel={this.handleCancel}
            onChange={this.handleInputEditChange}
            onUpdate={this.handleFormUpdate}
          />
        ) : (
          <SearchForm onSubmit={this.handleOnSubmit} />
        )}
        <Grid>
          {this.state.todos.map(({ id, text }, index) => (
            <GridItem key={id}>
              <Todo
                id={id}
                text={text}
                index={index + 1}
                onDelete={this.deleteToDo}
                onEdit={() => this.handleEdit({ id, text })}
              />
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
