import { useState, useEffect, useReducer } from "react"
import { db } from '.../firebase/config';
import {collection, addDoc, Timestamp} from 'firebase/firestore'

const initialState = {
    loading: null,
    error: null
}

const insertReducer = (state, action) => {
    switch(action.type) {
        case "LOADING":
            return{loading: true, error: null};
        case "INSERTED_DOC":
            return{loading: false, error: null};
        case "ERROR":
            return{loading: false, error: action.payload};
        default:
            return state;
    }
}

export const useInsertCocument = (docCollection) => {

    const [response, dispatch] = useReducer (insertReducer, initialState)

    // deal with memory leak

    const [cancelled, setCancelled] = useState(false)
    const checkCancelledBeforeDispach = (action) => {
        if (!cancelled) {
            dispatch(action)
        }
    }
const insertDocument = async(document) => {
    checkCancelledBeforeDispach({
        type: "LOADING",
       
    })

    try {
        const newdocument = {...document, createAt: Timestamp.now()}

        const insertDocument = await addDoc(
            collection(db, docCollection), 
            newdocument
        )
        checkCancelledBeforeDispach({
            type: "INSERTED_DOC",
            payload: insertDocument
        })
    } catch (error) {
        checkCancelledBeforeDispach({
            type: "ERROR",
            payload: error.message,
        })
    }
};
useEffect(() => {
    return () => setCancelled(true)
}, [])
    return {
        insertDocument,
        response
    };
}
