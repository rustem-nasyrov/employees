<template>
  <a-layout style="min-height: 100vh;">
    <a-layout-content>
      <a-row type="flex" justify="center">
        <a-col :span="12">
          <CreateUserWindow :users="usersForSelect" />
          <UsersTable :data="nestedUsers"/>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>

<script>
import UsersTable from './components/UsersTable/UsersTable';
import CreateUserWindow from './components/CreateUserWindow/CreateUserWindow';
import store from './store';
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'App',
  store,
  components: {
    CreateUserWindow,
    UsersTable,
  },
  /**
   * Добавлем в хранилище приложения данные о пользователях
   */
  created() {
    const users = window.localStorage.getItem('users');

    if (users) {
      this.replaceAllUsers(JSON.parse(users));
    }
  },
  computed: {
    /**
     * Список пользователей для формы
     * @return {object[]} Массив пользователей
     */
    usersForSelect() {
      return this.getUsers().map(({id, name}) => ({id, name}));
    },
    /**
     * Массив сотрудников, сгруппированных по подчинению пользователю
     * @return {object[]} Массив сотрудников, сгруппированных по подчинению пользователю
     */
    nestedUsers() {
      return this.getNestedUsers();
    },
  },
  methods: {
    /**
     * Добавление геттеров в методы компонента
     */
    ...mapGetters(['getUsers', 'getNestedUsers']),
    /**
     * Добавление экшенов в методы компонента
     */
    ...mapActions(['replaceAllUsers']),
  },
};
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: 16px;
  font-family: Roboto, sans-serif;
}
</style>
