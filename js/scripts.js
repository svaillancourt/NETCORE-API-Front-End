// Grab the index list of all todos.
const allToDos = document.getElementById( 'index' );
// If available, proceed.
if ( allToDos )
{ // Run Axios to obtain list.
  axios.get( 'https://localhost:44390/api/ToDoItems/' )
    // Get just the data from the response.
    .then( response => response.data )
    // "Process" our data (JSON object or array.)
    .then( data => {
      console.log( data );
      // Output list of todos.
      // data.forEach( toDo => {

      // } );
    } );
}

// Grab the "create" ToDo form.
const createToDo = document.getElementById( 'create' );
if ( createToDo )
{
  createToDo.addEventListener( 'submit', event => {
    event.preventDefault(); // Stop form from real submit.
    // Create the new todo.
    axios.post( "https://localhost:44390/api/ToDoItems/" )
      .then( response => { // On success, redirect to full list.
        document.location = './index.html'
      } );
  } );
}
