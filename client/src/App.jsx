import { useState , useEffect}  from "react"

function App() {
const [data, setData] = useState([])

useEffect(() => {
  const get = async() => {
    const response = await fetch("https://mern-ecommerce-rhpa.onrender.com")
    const data  = await response.json()
    setData(data)
  }
  get()
})
  return (
    <div>
     <h1 className="text-center text-4xl underline">Hello</h1>
     <h2 className="text-9xl text-center m-10 text-green-500 font-mono">{data.json}</h2>
    </div>
  )
}

export default App
