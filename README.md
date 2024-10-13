# INT-Test-Task

# Для запуска
Перейти в директорию проекта (testTaskApp) и выполнить команды:
```text
npm install

npm start
```

# Инструменты управления состоянием в React Native

Управление состоянием (State Management) в React Native — это процесс управления данными, которые изменяются в приложении.

## 1. Context API

**Плюсы:**
- Встроен в React.
- Хорошо подходит для простых случаев управления состоянием.

**Минусы:**
- Может стать громоздким при большом количестве контекстов.
- Трудно отлаживать и тестировать.

**Пример:**
```javascript
import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [state, setState] = useState(0);

  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
};

const MyComponent = () => {
  const { state, setState } = useContext(MyContext);

  return (
    <div>
      <p>State: {state}</p>
      <button onClick={() => setState(state + 1)}>Increment</button>
    </div>
  );
};

const App = () => (
  <MyProvider>
    <MyComponent />
  </MyProvider>
);
```

## 2. Redux

**Плюсы:**
- Предсказуемость состояния.
- Лёгкость тестирования.

**Минусы:**
- Много шаблонного кода.

**Пример:**
```javascript
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

const initialState = { count: 0 };

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + 1 };
        default:
            return state;
    }
}

const store = createStore(reducer);

const MyComponent = () => {
    const count = useSelector(state => state.count);
    const dispatch = useDispatch();

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
        </div>
    );
};

const App = () => (
    <Provider store={store}>
        <MyComponent />
    </Provider>
);
```

## 3. MobX

**Плюсы:**
- Реактивное программирование.
- Меньше шаблонного кода по сравнению с Redux.

**Минусы:**
- Сложнее отлаживать.

**Пример:**
```javascript
import React from 'react';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';

class Store {
    count = 0;

    constructor() {
        makeAutoObservable(this);
    }

    increment() {
        this.count += 1;
    }
}

const store = new Store();

const MyComponent = observer(() => (
    <div>
        <p>Count: {store.count}</p>
        <button onClick={() => store.increment()}>Increment</button>
    </div>
));

const App = () => <MyComponent />
```

## 4. Zustand

**Плюсы:**
- Хорошая производительность.
- Минималистичный API.

**Минусы:**
- Сложнее отлаживать.

**Пример:**
```javascript
import React from 'react';
import create from 'zustand';

const useStore = create(set => ({
    count: 0,
    increment: () => set(state => ({ count: state.count + 1 })),
}));

const MyComponent = () => {
    const { count, increment } = useStore();

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
        </div>
    );
};

const App = () => <MyComponent />;
```