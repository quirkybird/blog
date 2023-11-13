import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/index.css';
import 'animate.css' //导入动画库
import App from './App';
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client"

const client = new ApolloClient({
  uri: "http://118.25.46.240:2333/graphql",
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

