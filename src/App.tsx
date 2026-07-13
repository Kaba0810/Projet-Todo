
import {useState} from 'react'
import {useEffect} from 'react'
import Todoitem from './Todoitem'


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
    console.log(newTodos)
  }

  let fliteredTodos: Todo[] = []
  if (filter === 'Tous') {
    fliteredTodos = todos
  } else {
    fliteredTodos = todos.filter(todo => todo.priority === filter)
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
          <button className={`btn btn-soft ${filter ==="Tous" ? "btn-primary" : ""}`} onClick={() => setFilter("Tous")}>Tous</button>
        </div>
        {fliteredTodos.length > 0 ? (

        <ul className="divide-y divide-primary/20">
          { fliteredTodos.map((todo)=> (
            
            <li key={todo.id}>
              <Todoitem todo={todo}/>
            </li>
          ))}


        </ul>
      ) : (

          <div>test2</div>
        )  
        }
      </div>
     </div> 
    
    </div>
  )
}

export default App
