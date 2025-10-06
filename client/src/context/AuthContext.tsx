import { createContext, useContext, useEffect, useReducer } from "react";


const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
        return { user: null }
    default:
        return state
  }
};

export const AuthContextProvider = ({ children}) => {
    const [state, dispatch ] = useReducer(authReducer, { user: null})

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if(user) {
            dispatch({ type: "LOGIN", payload: user })
        }
    }, [])
    console.log("Authentication State", state)

    return (
        <AuthContext.Provider value={{ ...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) {
        throw Error("AuthContext must be used inside AuthContextProvider")
    }
    return context
}