import React from 'react';
import axios from 'axios';
import { Route, useHistory, useLocation } from 'react-router-dom';

import { List, AddList, Tasks } from './components';


function App() {
  const [lists, setLists] = React.useState(null);
  const [colors, setColors] = React.useState(null);
  const [activeItem, setActiveItem] = React.useState(null);
  let history = useHistory();
  let location = useLocation();


  React.useEffect(() => {   //как только компонент отрендерится, я хочу отправить этот запрос
    axios
    .get('http://localhost:3001/lists?_expand=color&_embed=tasks')
    .then( ({ data }) => {   //из response берем только data (деструктуризацией)
      setLists(data);   //устанавливается новый стэйт
    })
    axios.get('http://localhost:3001/colors')
    .then( ({ data }) => {
      setColors(data);
    })
  }, []);


  //Изменяем массив с об-тами списка задач:
  const onAddList = obj => {   //сюда передаем новый об-кт, сгенерированный в addList.jsx
    const newList = [...lists, obj];   //пересоздаём массив
    setLists(newList);   //заменяем стэйт lists
  }


  //Добавление нового таска в лист:
  const onAddTask = (listId, taskObj) => {   //получаем данные из AddTaskForm
    console.log(listId, taskObj);

    const newList = lists.map(item => {
      if(item.id === listId) {   //смотрим в этом ли списке мы хотим добавить задачу
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newList);
  }


  //Удаление отдельно таска в листе:
  const onRemoveTask = (listId, taskId) => {
    if (window.confirm("Вы действительно хотите удалить задачу?")) {   //если true
      const newList = lists.map(item => {
        if (item.id === listId) {   //нашли нужный список
          item.tasks = item.tasks.filter(task => task.id !== taskId);   //заменить все задачи в списке НА список задач без удаленной задачи
        }
        return item;
      });
      setLists(newList);   //сначала заменим стэйт, потом удалим на сервере

      axios.delete('http://localhost:3001/tasks/' + taskId)  //удаляем таск из базы данных
      .catch(() => {
        alert("Не удалось удалить квест");
      });
    }
  }


  //Изменяем название списка тасков:
  const onEditListTitle = (id, title) => {
    const newList = lists.map(item => {   //получаем состояние со списками -> пересоздаем его
      if(item.id === id) {   //если id айтема = id переданному
        item.name = title;
      }
      return item;
    });
    setLists(newList);
  }


  //Завершен или незавершен таск:
  const onComplete = (listId, taskId, completed) => {
    const newList = lists.map(list => {
      if (list.id === listId) {
        list.tasks = list.tasks.map(task => {
          if(task.id === taskId) {
            task.completed = completed;
          }
          return task;
        });
      }
      return list;
    });

    setLists(newList);

    axios.patch('http://localhost:3001/tasks/' + taskId, {
      completed: completed,
    })
    .catch(() => {
      alert("Не удалось пометить как завершенное");
    });
  }


  //Показ тасков соответствующих выбранному листу:
  React.useEffect(() => {   //узнать какой пропс изменился
    const listId = location.pathname.split('lists/')[1];   //1 элемент об-та, который нам вернет split  //=>получаем индекс listId
    console.log(listId);
    if(lists) {   //проверка если не null
      const list = lists.find(list => list.id === Number(listId));   //listId изначально строка
      setActiveItem(list);
    }
  }, [lists, location.pathname]);   //следит за этими изменениями
  
  console.log(location.pathname);


  return (
    <div className="quests">
      <div className="quests__sidebar">
        <List
        onClickItem={list => {
          history.push(`/`)   //'Все задачи' переходять на этот адрес
        }}
          items={[
            {
              active: location.pathname === '/',
              icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="7C7C7C" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.96 8.10001H7.74001C7.24321 8.10001 7.20001 8.50231 7.20001 9.00001C7.20001 9.49771 7.24321 9.90001 7.74001 9.90001H12.96C13.4568 9.90001 13.5 9.49771 13.5 9.00001C13.5 8.50231 13.4568 8.10001 12.96 8.10001ZM14.76 12.6H7.74001C7.24321 12.6 7.20001 13.0023 7.20001 13.5C7.20001 13.9977 7.24321 14.4 7.74001 14.4H14.76C15.2568 14.4 15.3 13.9977 15.3 13.5C15.3 13.0023 15.2568 12.6 14.76 12.6ZM7.74001 5.40001H14.76C15.2568 5.40001 15.3 4.99771 15.3 4.50001C15.3 4.00231 15.2568 3.60001 14.76 3.60001H7.74001C7.24321 3.60001 7.20001 4.00231 7.20001 4.50001C7.20001 4.99771 7.24321 5.40001 7.74001 5.40001ZM4.86001 8.10001H3.24001C2.74321 8.10001 2.70001 8.50231 2.70001 9.00001C2.70001 9.49771 2.74321 9.90001 3.24001 9.90001H4.86001C5.35681 9.90001 5.40001 9.49771 5.40001 9.00001C5.40001 8.50231 5.35681 8.10001 4.86001 8.10001ZM4.86001 12.6H3.24001C2.74321 12.6 2.70001 13.0023 2.70001 13.5C2.70001 13.9977 2.74321 14.4 3.24001 14.4H4.86001C5.35681 14.4 5.40001 13.9977 5.40001 13.5C5.40001 13.0023 5.35681 12.6 4.86001 12.6ZM4.86001 3.60001H3.24001C2.74321 3.60001 2.70001 4.00231 2.70001 4.50001C2.70001 4.99771 2.74321 5.40001 3.24001 5.40001H4.86001C5.35681 5.40001 5.40001 4.99771 5.40001 4.50001C5.40001 4.00231 5.35681 3.60001 4.86001 3.60001Z" fill="#7C7C7C"/>
                    </svg>,
              name: 'Все задачи',
            },
          ]}
        />

        {lists 
        ? (<List 
            items={lists}
            onRemove={id => {
              const newLists = lists.filter(item => item.id !== id);   //исключаем айтем из нового массива
              setLists(newLists);   //уже новый массив айтемов передаём в стэйт (lists)
            }}
            onClickItem={list => {   //при клике на любой из айтемов в этом компониенте =>
              history.push(`/lists/${list.id}`)   //вызывается push и в историю переходов по роуту доб-тся новый переход
            }}
            activeItem={activeItem}   //полученный айтем передаём в компонент
            isRemovable
          />)
        : ('Загрузка...')
        }

        <AddList 
          onAdd={onAddList} 
          colors={colors}
        />
      </div>

      <div className="quests__tasks">
        <Route exact path="/">   {/**рендерим все списки */}
          {
            lists &&   //проверяем не null ли lists
              lists.map(list => (
                <Tasks
                key={list.id}
                list={list}
                onEditTitle={onEditListTitle}
                onAddTask={onAddTask}
                onRemoveTask={onRemoveTask}
                onComplete={onComplete}
                noEmptyLists
                />
              ))
          }
        </Route>

        <Route path="/lists/:id">
          {lists && activeItem  //есть все списки и мы какой-то список выбрали
            && (
            <Tasks 
              list={activeItem}
              onEditTitle={onEditListTitle}
              onAddTask={onAddTask}
              onRemoveTask={onRemoveTask}
              onComplete={onComplete}
            />
          )}
        </Route>
      </div>
    </div>
  );
}

export default App;