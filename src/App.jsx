import React from 'react';
import PageTitle from './Components/PageTitle';
import AppHeader from './Components/AppHeader';

import TodoItem from './Components/TodoItem';
// import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div className='container'>
      <PageTitle>ToDo List</PageTitle>
     <AppHeader></AppHeader>
  
    <TodoItem></TodoItem>
   
    </div>
  );
};

export default App;
