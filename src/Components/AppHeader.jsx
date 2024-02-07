import React, { useContext, useEffect, useState } from 'react';

import Button, { SelectButton } from './Button';
import styles from '../styles/modules/app.module.scss';
import TodoModal from './TodoModal';
import { UserProvider } from '../context/AuthContext';
import { getData } from '../../public/Utilitis/Localstorage';


function AppHeader() {
  const [modalOpen, setModalOpen] = useState(false);
  const { dataFilter, setDataFilter } = useContext(UserProvider)

  const [duplicate, setDuplicate] = useState([])
  const [todo, setTodo] = useState(false)
  useEffect(() => {
    setDuplicate(getData())
  }, [todo])

  const updateFilter = (e) => {
    setTodo(!todo)
    if (e === 'complete') {
      const filterItme = duplicate.filter(item => item.status === 'complete')
      setDataFilter(filterItme)
    } else if (e === 'incomplete') {
      const filterItme = duplicate.filter(item => item.status === 'incomplete')
      setDataFilter(filterItme)
    } else {
      setDataFilter(duplicate)
    }

  }

  return (
    <div className={styles.appHeader}>
      <Button variant="primary" onClick={() => setModalOpen(true)}>
        Add Task
      </Button>
      <SelectButton
        id="status"
        onChange={(e) => updateFilter(e.target.value)}

      >
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Completed</option>
      </SelectButton>
      <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}

export default AppHeader;