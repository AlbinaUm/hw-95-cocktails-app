import {Routes, Route} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import Cocktails from "./containers/Cocktails/Cocktails";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import AddCocktail from "./containers/AddCocktail/AddCocktail";
import MyCocktails from "./containers/MyCocktails/MyCocktails";
import FullCocktailInfo from "./containers/FullCocktailInfo/FullCocktailInfo";

const App = () => (
    <Layout>
        <Routes>
            <Route path="/" element={<Cocktails/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="addNewCocktail" element={<AddCocktail/>}/>
            <Route path="/myCocktails" element={<MyCocktails/>}/>
            <Route path="/cocktailFullInfo/:id" element={<FullCocktailInfo/>}/>
            <Route path="*" element={<h1 style={{textAlign: "center", margin: "60px 0"}}>404 Not found</h1>}/>
        </Routes>
    </Layout>
);

export default App;

