import React, { createContext, useState } from "react";

export const ItemContext = createContext();

export const ItemProvider = (props) => {
  const [itemList, setItemList] = useState([
    { id: 0, title: "red", img: "imageOne" },
    { id: 1, title: "blue", img: "imgTwo" },
  ]);
  return(
      <ItemContext.Provider value = {[itemList,setItemList]}>
          {props.children}
      </ItemContext.Provider>
  )
};
