// Grab the index list of all todos.
const allToDos = document.getElementById( 'index' );
// If available, proceed.
if ( allToDos )
{ // Repeatable function for showing all of our to-dos.
  const outputToDos = () => {
    // Clear any existing items.
    allToDos.innerHTML = '';
    // Run Axios to obtain list.
    axios.get( 'https://localhost:44390/api/ToDoItems/' )
    // Get just the data from the response.
    .then( response => response.data )
    // "Process" our data (JSON object or array.)
    .then( data => {
      // console.log( data );
      data.forEach( toDo => { // Output list of todos.
        const toDoLI = document.createElement( 'LI' );
        toDoLI.textContent = ' ' + toDo.task;
        const toDoCheckbox = document.createElement( 'INPUT' );
        toDoCheckbox.type = 'checkbox';
        toDoCheckbox.addEventListener( 'click', event => {
          axios.delete( 'https://localhost:44390/api/ToDoItems/' + toDo.id )
            .then( response => { outputToDos(); } );
        } );
        toDoLI.prepend( toDoCheckbox );
        allToDos.appendChild( toDoLI );
      } );
    } );
  }
  // On pageload, output the todos!
  outputToDos();
}

// Grab the "create" ToDo form.
const createToDo = document.getElementById( 'create' );
// If there is a "create" ToDo form, proceed...
if ( createToDo )
{ // Listen for submission.
  createToDo.addEventListener( 'submit', event => {
    event.preventDefault(); // Stop form from real submit.
    // Retrieve form field values.
    const newTask = document.getElementById( 'task' ).value;
    const newCompleted = document.getElementById( 'completed' ).checked;
    // Create the new todo.
    axios.post( 'https://localhost:44390/api/ToDoItems/', {
      Task: newTask,
      Completed: newCompleted
    } )
      .then( response => { // On success, redirect to full list.
        document.location.href = './index.html';
      } )
      .catch( error => {
        console.log( error );
      } );
  } );
}
