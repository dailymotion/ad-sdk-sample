import './App.css'
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { HashRouter as Router } from "react-router-dom";
import Content from "./components/Content";
import {MenuProvider} from "./components/menuContext.tsx";

function App() {
    return (
        <Router>
            <Header />
            <main>
                <MenuProvider>
                    <Sidebar />
                    <Content />
                </MenuProvider>
            </main>
            <footer>
            </footer>
        </Router>
    )
}

export default App;
