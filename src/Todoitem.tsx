type priority = 'urgente' | 'moyenne' | 'basse'

type Todo = {
  id: number
  text: string
  priority: priority
}

type Props ={
    todo: Todo
}
const Todoitem = ({todo} : Props) => {
  return (
   <li className="p-3">
   <div className="flex justify-between items-center">
    <div className= "flex items-center gap-2">
    <input type="checkbox" className="checkbox checkbox-primary checkbox-sm"/>
   
    </div>

   </div>
    {todo.text}
   </li>
  )
}

export default Todoitem
