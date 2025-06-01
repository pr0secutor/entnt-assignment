import { createContext, useState, useContext } from "react";
import { localStorageUtils } from "../utils/localStorageUtils";
import { NotificationsContext } from "./NotificationsContext";

export const ShipsContext = createContext();

export const ShipsProvider = ({ children }) => {
  const [ships, setShips] = useState(localStorageUtils.getData("ships") || []);
  const { addNotification } = useContext(NotificationsContext);

  const addShip = (ship) => {
    console.debug('addShip called with:', ship);
    const newShip = { id: `s${ships.length + 1}`, ...ship };
    const updatedShips = [...ships, newShip];
    setShips(updatedShips);
    localStorageUtils.setData("ships", updatedShips);
    addNotification(`Ship ${newShip.name} added successfully`);
  };

  const updateShip = (id, updatedShip) => {
    console.debug('updateShip called for id:', id, 'with:', updatedShip);
    const updatedShips = ships.map((s) =>
      s.id === id ? { ...s, ...updatedShip } : s
    );
    setShips(updatedShips);
    localStorageUtils.setData("ships", updatedShips);
    addNotification(`Ship ${updatedShip.name} updated successfully`);
  };

  const deleteShip = (id) => {
    console.debug('deleteShip called for id:', id);
    const ship = ships.find((s) => s.id === id);
    const updatedShips = ships.filter((s) => s.id !== id);
    setShips(updatedShips);
    localStorageUtils.setData("ships", updatedShips);
    if (ship) {
      addNotification(`Ship ${ship.name} deleted successfully`);
    }
  };

  return (
    <ShipsContext.Provider value={{ ships, addShip, updateShip, deleteShip }}>
      {children}
    </ShipsContext.Provider>
  );
};

export default ShipsProvider;