import { useEffect, useRef, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";

export const useColoction = (collectionName, _query) => {
  const [data, setData] = useState(null);
  const queryData = useRef(_query);

  useEffect(() => {
    let q = collection(db, collectionName);

    // Agar _query kelgan bo‘lsa, unga qarab query yasaymiz
    if (queryData.current) {
      q = query(q, orderBy("timestamp", asc));
    } else if (collectionName !== "users") {
      q = query(q, orderBy("timestamp", "asc"));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dataArr = [];
      snapshot.forEach((item) => {
        dataArr.push({
          uid: item.id,
          ...item.data(),
        });
      });
      setData(dataArr);
    });

    return () => unsubscribe();
  }, [collectionName]);

  return { data };
};
