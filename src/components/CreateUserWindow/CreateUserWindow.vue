<template>
  <div>
    <a-button type="primary" @click="toggleVisibility">Добавить</a-button>
    <a-modal
      v-model="visible"
      title="Добавить пользователя"
      :ok-text="'Сохранить'"
      :cancel-text="'Отмена'"
      @ok="submit"
      @cancel="toggleVisibility"
    >
      <a-form :form="form" :rules="rules">
        <a-form-item label="Имя">
          <a-input
            :allow-clear="true"
            placeholder="Иван"
            v-decorator="rules.name"
          />
        </a-form-item>
        <a-form-item label="Телефон">
          <a-input
            :allow-clear="true"
            v-decorator="rules.phone"
            placeholder="+7 000 000 0000"
          />
        </a-form-item>
        <a-form-item label="Начальник">
          <a-select v-decorator="rules.chief" :allow-clear="true">
            <template v-for="{id, name} in users">
              <a-select-option v-key="id" :value="id">
                {{ name }}
              </a-select-option>
            </template>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

/**
 * Компонент для создания пользователя
 * @params users{object[]} Пользователи для списка начальников
 */
export default {
  name: "CreateUserWindow",
  props: {
    users: {
      required: false,
      type: Array,
    },
  },
  data() {
    return {
      visible: false,
      form: this.$form.createForm(this),
      rules: {
        name: [
          'name', {
            rules: [{ required: true, message: 'Введите имя', }],
          }
        ],
        phone: [
          'phone', {
            rules: [{ required: true, message: 'Введите телефон', }],
          }
        ],
        chief: [
          'chief', {
            rules: [{ required: false, initialValue: null, type: 'any', }],
          }
        ],
      },
    };
  },
  methods: {
    /**
     * Добавление экшенов в методы компонента
     */
    ...mapActions(['addUser']),
    /**
     * Добавление геттеров в методы компонента
     */
    ...mapGetters(['getUsers']),
    /**
     * Отображение окна
     */
    toggleVisibility() {
      this.visible = !this.visible;
    },
    /**
     * Сохранение данных в store
     * - валидация введенных значений
     * - очистка полей формы
     * - скрытие формы
     */
    submit() {
      const {validateFields} = this.form;

      validateFields((err, values) => {
        if (!err) {
          this.addUser({
            id: +Math.random(16).toString().substr(2),
            ...values,
          });

          this.form.resetFields();
          this.visible = !this.visible;
          window.localStorage.setItem('users', JSON.stringify(this.getUsers()))
        }
      });
    },
  },
}
</script>
