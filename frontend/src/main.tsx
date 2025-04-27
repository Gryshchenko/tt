import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Organization from "./components/Organization.tsx";
import FundingRound from "./components/FundingRound.tsx";
import App from "./components/App.tsx";
import Dashboard from "./components/Dashboard.tsx";
import ProjectDescription from "./components/ProjectDescription.tsx";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App><ProjectDescription/></App>} />
          <Route path="/dashboard" element={<App><Dashboard /></App>} />
          <Route path="/organization" element={<App><Organization /></App>} />
          <Route path="/organization/:id" element={<App><FundingRound /></App>} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
