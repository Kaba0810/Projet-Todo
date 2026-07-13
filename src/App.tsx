
import {useState} from 'react'
import {useEffect} from 'react'
import Todoitem from './Todoitem'
import { Construction } from 'lucide-react'



 type priority = 'urgente' | 'moyenne' | 'basse'

type Todo = {
  id: number
  text: string
  priority: priority
}


function App() {
  const [input, setInput] = useState<string>("")
  const [priority, setPriority] = useState<priority>('moyenne')
  const savedTodos = localStorage.getItem('todos')
  const initialTodos: Todo[] = savedTodos ? JSON.parse(savedTodos) : []
  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  const [filter, setFilter] = useState<priority | 'Tous'>('Tous')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  function addTodo() {
    if (input.trim() === "") {return

    }
    const newTodo: Todo = { 
      id: Date.now(),
      text: input.trim(),
      priority: priority
    }

    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
    setInput("")  
    setPriority('moyenne')
  
  }

  let fliteredTodos: Todo[] = []
  if (filter === 'Tous') {
    fliteredTodos = todos
  } else {
    fliteredTodos = todos.filter(todo => todo.priority === filter)
  }

  const urgentCount = todos.filter((t) => t.priority === "urgente" ).length
  const moyenneCount = todos.filter((t) => t.priority === "moyenne" ).length
  const basseCount = todos.filter((t) => t.priority === "basse" ).length
  const totalCount = todos.length

  function deleteTodo(id:number) {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
    setselectTodos((currentSelection) => {
      const newSelection = new Set(currentSelection)
      newSelection.delete(id)
      return newSelection
    })
  }

  const [selectTodos, setselectTodos] = useState<Set<number>>(new Set())

  function toggleTodo(id: number) {
    setselectTodos((currentSelection) => {
      const newSelection = new Set(currentSelection)

      if (newSelection.has(id)) {
        newSelection.delete(id)
      } else {
        newSelection.add(id)
      }

      return newSelection
    })
  }

  function deleteSelectedTodos() {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => !selectTodos.has(todo.id))
    )
    setselectTodos(new Set())
  }


  return (
    
    <div className="flex justify-center">
      <div className= "w-2/3 flex flex-col gap-4 my-15 bg-base-300 p-5 rounded-2xl">
      <div className = "flex gap-4">

        <input type="text" placeholder="Ajouter une tâche..." className="input  w-full" value = {input} onChange={(e) => setInput(e.target.value)}/>

        <select className="select w-full"
        value={priority} onChange={(e) => setPriority(e.target.value as priority)}>
          <option disabled selected>Priorité</option>
          <option value="urgente">Urgente</option>
          <option value="moyenne">Moyenne</option>
          <option value="basse">Basse</option>
        </select>
        <button onClick={addTodo} className="btn btn-primary">Ajouter</button>
        
      </div>
      <div className= "space-y-2 flex-1 h-fit">
        <div className="flex flex-wrap gap-4">

          <button className={`btn btn-soft ${filter ==="Tous" ? "btn-primary" : ""}`} onClick={() => setFilter("Tous")}>Tous({totalCount})</button>

          <button className={`btn btn-soft ${filter ==="basse" ? "btn-primary" : ""}`} onClick={() => setFilter("basse")}>Basse({basseCount})</button>

          <button className={`btn btn-soft ${filter ==="moyenne" ? "btn-primary" : ""}`} onClick={() => setFilter("moyenne")}>Moyenne({moyenneCount})</button>

          <button className={`btn btn-soft ${filter ==="urgente" ? "btn-primary" : ""}`} onClick={() => setFilter("urgente")}>Urgente({urgentCount})</button>

          <button
            className="btn btn-error"
            disabled={selectTodos.size === 0}
            onClick={deleteSelectedTodos}
          >
            Supprimer la sélection ({selectTodos.size})
          </button>

        </div>
        {fliteredTodos.length > 0 ? (

        <ul className="divide-y divide-primary/20">
          { fliteredTodos.map((todo)=> (
            
            <li key={todo.id}>
              <Todoitem
                todo={todo}
                onDelete={() => deleteTodo(todo.id)}
                isSelected={selectTodos.has(todo.id)}
                onToggle={() => toggleTodo(todo.id)}
              />
            </li>
          ))}


        </ul>
      ) : (

        <div className='flex justify-center items-center flex-col p-5'>
          <div>
            <Construction className='w-40 h-40 text-primary'/>
          </div>
          <p className='py-8 text-center italic text-gray-400'>Aucune tâche n'a été ajouté</p>
        </div>
          
        )  
        }
      </div>
     </div> 
    
    </div>
  )
}

export default App
