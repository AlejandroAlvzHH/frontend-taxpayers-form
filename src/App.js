import React from "react";
import "./App.css";
import TaxpayerForm from "./components/TaxpayerForm";
import HeaderComponent from "./components/HeaderComponent";

function App() {
  return (
    <div className="App">
    <HeaderComponent/>
      <TaxpayerForm />
    </div>
  );
}

export default App;
