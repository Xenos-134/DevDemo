//Styling
import logo from './logo.svg';
import './App.css';

//React imports
import { useContext, useState } from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";

//Routes
import ShopAllPage from "./Pages/ShopAllPage";
import HomePage from "./Pages/HomePage";
import { NAVIGATION_CONTEXT_DEFAULT_STATE, NavigationContext } from './Context/NavigationContext';
import AddNewAssetComponent from './StyleComponents/AddNewAssetComponent';
import NotFoundPage from './Pages/NotFoundPage';

function App() {
  const [modalOpenState, setModalOpenState] = useState(false);
  const [navigationContext, setNavigationContext] = useState(NAVIGATION_CONTEXT_DEFAULT_STATE);


  return (
    <NavigationContext.Provider value={{
        navigationContext, 
        setNavigationContext, 
        setModalOpenState
        }}>
      <AddNewAssetComponent open={modalOpenState} setModalOpenState={setModalOpenState}/>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage/>} path='/'/>
          <Route element={<ShopAllPage/>} path='/shop_all'/>
          <Route element={<NotFoundPage/>} path="*"/>
        </Routes>
      </BrowserRouter>
    </NavigationContext.Provider>
  );
}

export default App;
