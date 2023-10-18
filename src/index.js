import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/index.css';
import App from './App';
import {ApolloClient, InMemoryCache, ApolloProvider, gql} from "@apollo/client"

const client = new ApolloClient({
  uri: "http://localhost:2333/graphql",
  cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

