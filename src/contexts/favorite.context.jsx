import { createContext, useEffect, useState } from "react";
import { addProductToFav, getFavProducts, removeProductFromFav } from "../services/favorites.service";
import { getPremiumStatus } from "../utilities/blockchainUtils";

const FAVORITE_LIMIT = 4;

export const FavoriteContext = createContext({
    // properties
    ids: [],
    isPremiumUser: false,
    // methods
    add: (id) => false,
    remove: (id) => null,
    isFav: (id) => null,
    getCount: () => null,
    refreshPremiumStatus: async () => false,
});

export const FavoriteProvider = ({ children }) => {

    const [ids, setIds] = useState([]);
    const [isPremiumUser, setIsPremiumUser] = useState(false);

    useEffect(() => {
        updateIds();
        refreshPremiumStatus();
    }, []);

    const add = (id) => {
        if (!isPremiumUser && ids.length >= FAVORITE_LIMIT) {
            return false;
        }

        addProductToFav(id);
        updateIds();
        return true;
    }
    const remove = (id) => {
        removeProductFromFav(id);
        updateIds();
    }
    const isFav = (id) => ids.includes(id);
    const getCount = () => ids.length;

    async function refreshPremiumStatus() {
        const premiumStatus = await getPremiumStatus();
        setIsPremiumUser(premiumStatus);
        return premiumStatus;
    }

    function updateIds() {
        setIds(getFavProducts());
    }

    const value = { ids, isPremiumUser, add, remove, isFav, getCount, refreshPremiumStatus };

    return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>
}