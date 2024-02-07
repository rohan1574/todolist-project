
import { MdDelete, MdEdit } from 'react-icons/md';
import CheckButton from '../Components/CheckButton'
import styles from '../styles/modules/todoItem.module.scss';
import { editCard, getData, removeCard } from '../../public/Utilitis/Localstorage';
import { useContext, useEffect, useState } from 'react';
import { UserProvider } from '../context/AuthContext';
import moment from 'moment';
import toast from 'react-hot-toast';


const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function TodoItem() {
  const { todo, setTodo, dataFilter, setDataFilter } = useContext(UserProvider)
  const [data, setData] = useState([])
  const [up, setUp] = useState(false)

  useEffect(() => {
    setData(dataFilter)
  }, [dataFilter])


  useEffect(() => {
    setData(getData())
  }, [todo, up])

  const handelDelete = (item) => {
    removeCard(item.id)
    setTodo(!todo)
    toast.success('Successfully deleted!')
  }

  const [defaultv, setDefaultv] = useState({})

  const handelEdit = (item) => {
    document.getElementById('my_modal_3').showModal()
    setDefaultv(item)
  }

  const handelUpdate = (e) => {
    e.preventDefault()
    const todo = e.target.todo.value || defaultv.todo;
    const status = e.target.status.value || defaultv.status;
    const time = moment().format('LT') || defaultv.time
    const date = moment().format("MMM Do YY") || defaultv.date
    const id = defaultv.id
    const data = { todo, status, time, date, id }
    editCard(data)
    setUp(!up)
    toast.success('Successfully updated!')
    document.getElementById('my_modal_3').close()
    e.target.reset()
  }

  const handelChange = (item) => {
    const { id, status, ...otherProperties } = item;
    const checkbox = document.getElementById('cheke');
    if (checkbox.checked) {
      const updatedItem = {
        ...otherProperties,
        id,
        status: 'complete'
      };
      editCard(updatedItem)
      setUp(!up)
      toast.success('Successfully updated!')
    } else {
      const updatedItem = {
        ...otherProperties,
        id,
        status: 'incomplete'
      };
      editCard(updatedItem)
      setUp(!up)
      toast.success('Successfully updated!')
    }
  }


  return (
    <>
      {
        data?.map((item, i) => {
          return <div key={i} className={styles.item} variants={child}>
            <div className={styles.todoDetails}>

              <input onChange={() => handelChange(item)} checked={item.status === 'complete' && "checked"} className="checkbox checkbox-lg" type="checkbox" id="cheke" />
              <div className={styles.texts}>
                <p className=''>

                  {
                    item?.status === 'complete' ? <del> {item?.todo}</del> : <>{item?.todo}</>
                  }

                </p>
                <p className={styles.time}>
                  {item?.time} ({item?.date})
                </p>
              </div>
            </div>
            <div className={styles.todoActions}>
              <div onClick={() => handelDelete(item)}
                className={styles.icon}

                tabIndex={0}
                role="button"
              >
                <MdDelete />
              </div>
              <div onClick={() => handelEdit(item)}
                className={styles.icon}

                role="button"
              >
                <MdEdit />
              </div>
            </div>
          </div>
        })
      }


      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <form onSubmit={handelUpdate}>
            <input class="input input-bordered w-full max-w-xs" name='todo' defaultValue={defaultv?.todo} type="text" />
            <label htmlFor="type">

              <select
                class="select select-bordered w-full max-w-xs mt-5"
                id="type"
                name='status'

              >
                <option value="incomplete">Incomplete</option>
                <option value="complete">Completed</option>
              </select>
            </label> <br />
            <input class="btn btn-outline btn-secondary mt-5" type="submit" value="Update now" />
          </form>
        </div>
      </dialog>

    </>
  );
}

export default TodoItem;