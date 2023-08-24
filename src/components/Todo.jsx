const Todo = (props) => {
  const handleDeleteClick = () => {
    props.onDeleteClick(props.todo.id);
  };

  const handleCheckboxChange = () => {
    props.onCheckboxChange(props.todo.id);
  };

  return (
    <li className='bg-lightgreen'>
      <label key={props.todo.id}>
        <input
        key={props.todo.id}
          type="checkbox"
          checked={props.todo.isCompleted}
          onChange={handleCheckboxChange}
        />
        <span>{props.todo.title}</span>
      </label>
      <button onClick={handleDeleteClick}>Del</button>
    </li>
  );
};

export default Todo;
