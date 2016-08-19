export default function reducer(state={todos:[],filterTodos:[]},action) {
    state.filterTodos=state.todos;
    switch (action.type){
        case 'ADD':
            state.todos.push({todo:action.todo,isDone:false});
            return state;
        case 'TOGGLE':
            state.todos[action.index].isDone=!state.todos[action.index].isDone;
            return state;
        case 'DELETE':
            state.todos.splice(state.todos[action.index],1);
            state.filterTodos=state.todos;
            return state;
        case 'ALL':
            state.filterTodos=state.todos;
            return state;
        case 'ACTIVE':
            state.filterTodos=state.todos.filter(f=>!f.isDone);
            return state;
        case 'COMPLETED':
            state.filterTodos=state.todos.filter(f=>f.isDone);
            return state;
        case 'CLEAR COMPLETED':
            state.todos.map((m,index)=>{
                if(m.isDone)
                {state.todos.splice(index,1)}
            });
            state.filterTodos=state.todos;
            return state;
        case 'MAKE COMPLETED':
            state.todos.map((m)=>{
               if(!m.isDone)
               {m.isDone=!m.isDone}
            });
            state.filterTodos=state.todos;
            return state;
    }
    return state;
}