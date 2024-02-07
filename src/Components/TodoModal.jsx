
import { MdOutlineClose } from 'react-icons/md';

import { AnimatePresence, motion } from 'framer-motion';

import styles from '../styles/modules/modal.module.scss';
import Button from './Button';
import moment from 'moment';
import { addData } from '../../public/Utilitis/Localstorage';
import { useContext } from 'react';
import { UserProvider } from '../context/AuthContext';

const dropIn = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: 'scale(0.9)',
    opacity: 0,
  },
};

function TodoModal({ type, modalOpen, setModalOpen }) {

  const { todo, setTodo } = useContext(UserProvider)
  const currentDate = new Date().toLocaleString()
  const handelSubmit = (e) => {
    e.preventDefault()
    const todo = e.target.todo.value;
    const status = e.target.status.value;
   
    // const time = moment().format('LT')
    // const date = moment().format("MMM Do YY")
    const id = Math.floor(Math.random() * 100)
    const data = { todo, status,currentDate, id }
    addData(data)
    setTodo(todo)
    setModalOpen(false)
    e.target.reset()
  }


  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.closeButton}
              onClick={() => setModalOpen(false)}
              role="button"
              tabIndex={0}
              // animation
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>

            <form onSubmit={handelSubmit} className={styles.form} >
              <h1 className={styles.formTitle}>
                {type === 'add' ? 'Add' : 'Update'} TODO
              </h1>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name='todo'

                />
              </label>
              <label htmlFor="type">
                Status
                <select
                  id="type"
                  name='status'

                >
                  <option value="incomplete">Incomplete</option>
                  <option value="complete">Completed</option>
                </select>
              </label>
              <div className={styles.buttonContainer}>
                <Button type="submit" variant="primary">
                  {type === 'add' ? 'Add Task' : 'Update Task'}
                </Button>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TodoModal;