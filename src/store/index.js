//import _default from 'antd/lib/checkbox/Group';
import { createStore ,applyMiddleware,compose} from 'redux';
import reducer from './reducer';

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ }) : compose;
// const enhancer = composeEnhancers(
//     applyMiddleware(thunk))

// const store=createStore(
    // reducer,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    // );
    // sagaMiddleware.run(todoSagas))
    const store=createStore(reducer);
export default store;