import React from "react";
import Navbar from "./Navbar";

export function Header () {
  return (
    <div id="header">
        <h1 className="font-bold text-lg flex justify-center">Stacks & Joules</h1>
        <Navbar />
    </div>
   
  );
}