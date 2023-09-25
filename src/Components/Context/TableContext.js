"use client"
import { createContext, useCallback, useContext, useReducer } from "react";
import axios from "axios";




export const TableContext = createContext(undefined);


const TableReducer = (state, action) => {
    if (action.type === "FETCHING_TABLE") {
        console.log("Entered!")
        return {
            ...state,
            keys: [...action.keys],
            data: [...action.data]
        }
    } else if (action.type === 'SELECTING_ROW') {
        console.log(action.row)
        return {
            ...state,
            selectedRow: action.item
        }
    } else if (action.type === 'ADDING_ELEMENT') {

        return {
            ...state,
            data: [...state.data, action.item]
        }
    } else if (action.type === 'SELECT_ELEMENT') {
        return {
            ...state,
            selectedRow: action.item
        }
    } else if (action.type === 'REFRESH_TABLE') {
        return {
            ...state,
            data: [...action.data]
        }
    }else if (action.type === 'SET_BIGGEST'){
        return {
            ...state,
            biggest: action.biggest
        }
    }else if(action.type === 'DATA'){
        return {
            ...state,
            full_data: [...action.full_data],
        }
    }
}








const TableContextProvider = (props) => {

    const fetchData = useCallback(async () => {
        console.log("Entered!");

        try {
            let data;
            /*
            let {data, error} = await supabase
                .from('experimental')
                .select('*')
            */
            await fetch('http://localhost:8080/countries')
                .then(Response => Response.json())
                .then(result => data = result)
                .catch((err) => console.log(err))

            console.log(data);
            if(data === null || data.length === 0){
                return;
            }
            
            let biggest = 0;
            for (let i = 0; i < data.length; ++i) {
                if (data[i]['id'] > biggest) {
                    biggest = data[i]['id'];
                }
            }
            
            
            const keys = [...Object.keys(data[0])]
            dispatchTable({ type: "FETCHING_TABLE", data: data, keys: keys })
            dispatchTable({type: "SET_BIGGEST", biggest: biggest});
        } catch (error) {
            console.log(error)
        }

    }, []);

    const selectItem = (item) => {
        console.log(item);
        console.log("Entered herere!");
        dispatchTable({ type: "SELECT_ELEMENT", item: item })
    }


    const addElement = async (item, user) => {
        console.log(item);
        let datetime = new Date().toISOString().slice(0, 10) + " " + new Date().toLocaleTimeString('en-GB')
        console.log(datetime);
        const returnedItem = {
            ...item,
            isActive: 1,
            creator: user,
            create_date: datetime,
            modify_user: null,
            modify_date: null,
        }
        console.log("Entered!!!");
        await axios.post("http://localhost:8080/saveCountry", returnedItem);
        window.location.reload(true);
    }

    const updateElement = async (item, user) => {
        let datetime = new Date().toISOString().slice(0, 10) + " " + new Date().toLocaleTimeString('en-GB');
        const returnedItem = {
            ...item,
            modify_user: user,
            modify_date: datetime,
        }
        const url = `http://localhost:8080/updateCountry/${returnedItem.id}`;

        await axios.post(url, returnedItem);
        window.location.reload(true);
    } 

    const deleteElement = async (item) => {
        console.log(item)
        const url = `http://localhost:8080/deleteCountry/${item.id}`;
        await axios.post(url)
        window.location.reload(true);
    }



    const defaultContext = {
        data: [],
        selectedRow: undefined,
        full_data: [],
        keys: [],
        biggest: 0,
        fetchData: fetchData,
        selectedItem: {},
        selectItem: selectItem,
        addElement: addElement,
        deleteElement: deleteElement,
        updateElement: updateElement,
        user: "User",
    }

    const [state, dispatchTable] = useReducer(TableReducer, defaultContext)

    return <TableContext.Provider value={state}>{props.children}</TableContext.Provider>
}


export default TableContextProvider


export function useTableContext() {
    const context = useContext(TableContext);
    if (!context) {
        throw new Error(
            "Table context must be usen with provider"
        );
    }
    return context;
}