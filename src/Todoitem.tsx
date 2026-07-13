import {Trash} from "lucide-react"

type priority = 'urgente' | 'moyenne' | 'basse'

type Todo = {
  id: number
  text: string
  priority: priority
}

type Props ={
    todo: Todo
    onDelete: () => void
    isSelected: boolean
    onToggle: () => void
}
const Todoitem = ({todo, onDelete, isSelected, onToggle} : Props) => {
  return (
   <div className="p-3">
   <div className="flex justify-between items-center">
    <div className= "flex items-center gap-2">
    <input
      type="checkbox"
      checked={isSelected}
      onChange={onToggle}
      className="checkbox checkbox-primary checkbox-sm"
    />
    <span className= "text-md font-bold">
      <span> {todo.text} </span>

    </span >
   <span
            className={`badge badge-sm badge-soft ${
              todo.priority === 'urgente'
                ? 'badge-error'
                : todo.priority === 'moyenne'
                  ? 'badge-warning'
                  : 'badge-success'
            }`}
          >
            {todo.priority}
    </span>
   
    </div>
    
      <button
      onClick={onDelete}
      className ="btn btn-sm btn-error">
       <Trash className = "w-4 h-4" />
      </button>
    

   </div>
    
   </div>
  )
}

export default Todoitem
