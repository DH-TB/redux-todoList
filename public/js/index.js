import React, {Component} from 'react';
import {render} from 'react-dom';
import reducer from './reducer/reducer';
import {createStore} from 'redux';
const store = createStore(reducer);

class App extends Component {
    addToDo(todo) {
        store.dispatch({type: 'ADD', todo});
    }

    toggle(index) {
        store.dispatch({type: 'TOGGLE', index});
    }

    filter(filterName) {
        store.dispatch({type: filterName})
    }
    onDelete(index){
        store.dispatch({type: 'DELETE', index});
    }

    render() {
        return <div>
            <TodoList onAdd={this.addToDo.bind(this)}/>
            <Todo todos={store.getState().filterTodos}
                  toggle={this.toggle.bind(this)}
                  delete={this.onDelete.bind(this)}/>
            <Footer filter={this.filter.bind(this)}/>
        </div>
    }
}
class TodoList extends Component {
    add() {
        const input = this.refs.input.value;
        this.props.onAdd(input);
        this.refs.input.value = '';
    }
    allChoose(filterName) {
        this.props.filter(filterName)
    }

    render() {
        return <div>
            <button onClick={this.filter.bind(this, 'MAKE COMPLETED')}>Make Completed</button>
            <input type="text" ref="input"/>
            <button onClick={this.add.bind(this)}>+</button>
        </div>
    }
}

class Todo extends Component {
    toggle(index) {
        this.props.toggle(index);
    }

    delete(index) {
        this.props.delete(index);
    }

    render() {
        const todos = this.props.todos.map((t, index)=> {
            return <div key={index}>
                <input type='checkbox' onClick={this.toggle.bind(this, index)} checked={t.isDone}/>
                <span style={{"textDecoration": t.isDone ? "line-through" : ''}}>{t.todo}</span>
                <button onClick={this.delete.bind(this, index)}>X</button>
            </div>
        });
        return <div>

            {todos}
        </div>
    }
}

class Footer extends Component {
    filter(filterName) {
        this.props.filter(filterName)
    }

    render() {
        return <div>
            <button onClick={this.filter.bind(this, 'ALL')}>All</button>
            <button onClick={this.filter.bind(this, 'ACTIVE')}>Active</button>
            <button onClick={this.filter.bind(this, 'COMPLETED')}>Completed</button>
            <button onClick={this.filter.bind(this, 'CLEAR COMPLETED')}>Clear Completed</button>
        </div>
    }
}

function Fsubscribe() {
    render(<App/>, document.getElementById('root'));
}
store.subscribe(Fsubscribe);
Fsubscribe();