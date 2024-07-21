import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import ReactDOM from 'react-dom/client';
import './assets/index.css';
import 'animate.css'; //导入动画库
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  // uri: 'http://localhost:80/graphql',
  uri: 'https://server.yamorz.top/graphql',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
  // </React.StrictMode>
);
