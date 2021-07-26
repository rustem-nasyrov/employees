import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/**
 * Хранилище приложения
 */
export default new Vuex.Store({
  state: {
    users: [],
  },
  mutations: {
    /**
     * Мутация для добавления нового пользователя
     * @param state {object} Состояние
     * @param user {object} Пользователь
     * @constructor
     */
    ADD_USER(state, user) {
      state.users.push(user);
    },
    /**
     * Перезапись данных пользователей в хранилище
     * @param state {object} Состояние
     * @param users {object[]} Массив пользователей
     * @constructor
     */
    REPLACE_USERS(state, users) {
      state.users = users;
    },
  },
  actions: {
    /**
     * Экшен для для вызова мутации с целью добавления пользователя
     * @param state {object} Состояние
     * @param user {object} Пользователь
     */
    addUser(state, user) {
      state.commit('ADD_USER', user);
    },
    /**
     * Полная перезапись пользователей в хранилище
     * @param state {object} Состояние
     * @param users {object[]} Массив пользователей
     */
    replaceAllUsers(state, users) {
      state.commit('REPLACE_USERS', users);
    }
  },
  getters: {
    /**
     * Получить список пользователей как есть
     * @return {object[]} Массив пользователей
     */
    getUsers: state => state.users,
    /**
     * Получить список пользователей в зависимости от подчинения другому пользователю.
     * @return {object[]} Массив пользователей с вложенными пользователями
     */
    getNestedUsers({ users }) {

      return users.reduce((acc, user) => {
        if (typeof user.chief !== 'number') {
          acc.push(user);
        }

        const nested = users.reduce((nested, nestedUser) => {
          if (nestedUser.chief === user.id){
            nested.push(nestedUser)
          }

          return nested;
        }, [])

        if (!user.nested) {
          user.nested = [];
        }

        user.nested = nested;

        return acc;
      }, []);
    },
  },
});
