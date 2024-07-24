import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { v4 as uuidv4 } from 'uuid';
import { RiEditFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";



function App() {
  
  const saveToLS=() => {
    localStorage.setItem('todos',JSON.stringify(todos))

  }
  const [showfinished, setShowfinished] = useState(true)
  const first = useRef(null)
  const [todo, setTodo] = useState('')
  // const [tododes, setTododes] = useState('')
  const [todos, setTodos] = useState([])
  const handleAdd = () => {
    console.log('add')
    setTodos([...todos, { id:uuidv4() ,todo, isCompleted: false }])
    // setTodos([...todos, { tododes, isCompleted: false }])
    setTodo('')
    // setTododes('')
    console.log(todos);
    saveToLS()
  }
  const toggleFinished = (e) => {
    setShowfinished(!showfinished)
    saveToLS()
  }
  const handleEdit = (e,id) => {
    let t = todos.filter(i=>
      i.id===id
    )
    setTodo(t[0].todo)
    first.current.innerHTML="Save";
    handleDel(e,id)
    saveToLS()
  }
  const handleDel = (e,id) => {
    let index=todos.findIndex(item=>{  return item.id===id});
    let newTodos=[...todos];
    newTodos.splice(index,1);
    setTodos(newTodos)
    saveToLS()
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheck = (e) => {
    let id=e.target.name;
    let index=todos.findIndex(item=>{  return item.id===id});
    let newTodos=[...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }
  useEffect(() => {
    first.current.innerHTML="Add";
    let todoString=localStorage.getItem('todos')
    if(todoString){
      let todos=JSON.parse(localStorage.getItem('todos'))
      setTodos(todos)
    }
  }, [])
  
  return (
    <>
      <Navbar />
      <main className='border  max-h-[90.5vh] min-w-[222px] text-blue-900'>
        <div className="todos bg-gray-700 p-2 md:p-10 h-[80vh] md:h-[90vh]">
          <div className=" border md:w-[60vw] h-full overflow-auto  mx-auto  bg-gray-400 rounded-xl ">
            <div className='  bg-gray-400  sticky top-0 py-6'>
            <h2 className='text-4xl font-extrabold bg-transparent text-center underline'>Add Your Todo</h2>
            <div className='bg-transparent flex gap-3 items-center justify-center my-4'>
              <input type="text" onChange={handleChange} value={todo} className='focus:shadow-none shadow-md active:shadow-none shadow-black text-white font-bold px-4 py-2 placeholder:text-gray-300 placeholder:font-normal rounded-md w-[80%] md:w-[50%]' placeholder='Enter Your Todo' />
              <button className='btnadd text-white font-bold  px-5 pt-1 pb-[4px] bg-gray-500 mx-2 rounded-md text-center transition-all duration-200 shadow-md active:shadow-none shadow-black hover:bg-gray-700 active:bg-gray-500 w-[70px] disabled:bg-gray-300 disabled:shadow-none' disabled={todo.length===0} ref={first} onClick={handleAdd}>Add</button>
            </div>
            </div>
            <h2 className='bg-transparent text-black text-2xl font-bold mt-10 text-center underline'>Your Todos</h2>
            <div className='bg-transparent flex items-center justify-center md:block md:my-5'>
            <input type="checkbox" checked={showfinished} onChange={toggleFinished} name="" id="hide" />
            <label htmlFor="hide" className='bg-transparent text-black text-xl mx-3 mt-6 mb-3 font-bold'>Completed...</label>
            </div>
            {todos.length === 0 ? <h3 className='bg-transparent text-black text-3xl text-center font-bold mt-4'>No Todos</h3> : null}
            {todos.map(item => (
               ( showfinished || !item.isCompleted) && <div key={item.id} className="showtodo my-2 flex items-center justify-between border border-black px-4 py-2 text-black">

                <div className="text flex items-baseline gap-1">
                  <input name={item.id} onChange={handleCheck} type="checkbox" checked={item.isCompleted} id="" />
                <h3 className={item.isCompleted ?"line-through cursor-pointer text-xl selection:bg-none":'cursor-pointer font-bold text-xl selection:bg-none underline'} >{item.todo}</h3>
                </div>
                <div className="buttons flex bg-transparent">
                  <button className='px-2 md:px-4 py-1 transition-all duration-200 mx-1 md:mx-3 rounded-xl bg-gray-300 hover:bg-gray-700 shadow-md active:shadow-none shadow-black hover:text-white active:bg-gray-400 active:text-black' onClick={(e) => {handleEdit(e,item.id)}}><RiEditFill />
                  </button>
                  <button className='px-2 md:px-4 py-1 transition-all duration-200 mx-1 md:mx-3 rounded-xl bg-gray-300 hover:bg-gray-700 shadow-md active:shadow-none shadow-black hover:text-white active:bg-gray-400 active:text-black' onClick={(e) => {handleDel(e,item.id)}}><MdDelete />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}

export default App
