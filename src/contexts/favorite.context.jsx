import { createContext, useEffect, useState } from "react";
import { addProductToFav, getFavProducts, removeProductFromFav } from "../services/favorites.service";

export const FavoriteContext = createContext({
    // properties
    ids: [],
    // methods
    add: (id) => null,
    remove: (id) => null,
    isFav: (id) => null
});

export const FavoriteProvider = ({ children }) => {

    const [ids, setIds] = useState([]);

    useEffect(() => {
        updateIds();
    }, []);

    const add = (id) => {
        addProductToFav(id);
        updateIds();
    }
    const remove = (id) => {
        removeProductFromFav(id);
        updateIds();
    }
    const isFav = (id) => ids.includes(id);

    function updateIds() {
        setIds(getFavProducts());
    }

    const value = { ids, add, remove, isFav };

    return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>
}