import { createContext, useState } from 'react';
import { localStorageUtils } from '../utils/localStorageUtils';

export const ComponentsContext = createContext();

export const ComponentsProvider = ({ children }) => {
  const [components, setComponents] = useState(localStorageUtils.getData('components'));

  const addComponent = (component) => {
    const newComponent = { id: `c${components.length + 1}`, ...component };
    const updatedComponents = [...components, newComponent];
    setComponents(updatedComponents);
    localStorageUtils.setData('components', updatedComponents);
  };

  const updateComponent = (id, updatedComponent) => {
    const updatedComponents = components.map(c => c.id === id ? { ...c, ...updatedComponent } : c);
    setComponents(updatedComponents);
    localStorageUtils.setData('components', updatedComponents);
  };

  const deleteComponent = (id) => {
    const updatedComponents = components.filter(c => c.id !== id);
    setComponents(updatedComponents);
    localStorageUtils.setData('components', updatedComponents);
  };

  return (
    <ComponentsContext.Provider value={{ components, addComponent, updateComponent, deleteComponent }}>
      {children}
    </ComponentsContext.Provider>
  );
};