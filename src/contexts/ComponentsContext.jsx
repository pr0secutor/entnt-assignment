import { createContext, useContext, useState } from 'react';
import { localStorageUtils } from '../utils/localStorageUtils';
import { NotificationsContext } from './NotificationsContext';

export const ComponentsContext = createContext();

export const ComponentsProvider = ({ children }) => {
  const [components, setComponents] = useState(localStorageUtils.getData('components'));
  const {addNotification} = useContext(NotificationsContext);

  const addComponent = (component) => {
    const newComponent = { id: `c${components.length + 1}`, ...component };
    const updatedComponents = [...components, newComponent];
    setComponents(updatedComponents);
    localStorageUtils.setData('components', updatedComponents);
    addNotification(`Component ${newComponent.name} created for Ship ${newComponent.shipId}`);
  };

  const updateComponent = (id, updatedComponent) => {
    const updatedComponents = components.map(c => c.id === id ? { ...c, ...updatedComponent } : c);
    setComponents(updatedComponents);
    localStorageUtils.setData('components', updatedComponents);
    addNotification(`Component ${updatedComponent.name} updated for Ship ${updatedComponent.shipId}`);
  };

  const deleteComponent = (id) => {
    const component = components.filter(c =>c.id === id)[0];
    const updatedComponents = components.filter(c => c.id !== id);
    setComponents(updatedComponents);
    localStorageUtils.setData('components', updatedComponents);
    addNotification(`Component ${component.name} deleted for Ship ${component.shipId}`);
  };

  return (
    <ComponentsContext.Provider value={{ components, addComponent, updateComponent, deleteComponent }}>
      {children}
    </ComponentsContext.Provider>
  );
};