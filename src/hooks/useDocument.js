import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export default function useDocument(colectionName, documentid) {
    const[data,setData]=useState()
    useEffect(() => {

        const unsub = onSnapshot(doc(db, colectionName, documentid), (doc) => {
           setData({
            id:doc.id,
            ...doc.data()
           })
        });
        return()=>unsub()
    }, [documentid])
    return {data}
}
