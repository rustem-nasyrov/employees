<template>
  <div class="users-table" :class="{'users-table--nested': isNested}">
    <div class="users-table-row" v-if="!isNested">
      <div class="users-table-row__cell">Имя</div>
      <div class="users-table-row__cell">Телефон</div>
    </div>
    <template v-for="{id, name, phone, nested} in data">
      <div class="users-table-row" v-if="!nested.length" :key="id">
        <div class="users-table-row__cell">{{ name }}</div>
        <div class="users-table-row__cell">{{ phone }}</div>
      </div>
      <template v-else>
        <div class="users-table-row" :key="id">
          <div class="users-table-row__cell">{{ name }}</div>
          <div class="users-table-row__cell">{{ phone }}</div>
        </div>
        <div class="users-table-row">
          <div class="users-table-row__cell" style="flex: 1 100%; padding: 0;" :style="{paddingLeft: `${gap}px`}">
            <UsersTable :data="nested" :is-nested="true" :gap="gap + 5"/>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
/**
 * Компонент для отображения пользователей
 * @param data {object[]} Данные пользователей
 * @param isNested {boolean} Является ли таблица вложенной
 * @param gap {number} Отступы для вложенной таблицы
 */
export default {
  name: "UsersTable",
  props: {
    data: {
      required: true,
      type: Array,
    },
    isNested: {
      default: false,
      required: false,
      type: Boolean,
    },
    gap: {
      default: 5,
      required: false,
      type: Number,
    },
  },
}
</script>

<style scoped>
.users-table {
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  margin: 1rem 0;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #999;
  overflow: hidden auto;
}

.users-table--nested {
  border-radius: 0;
  margin: 0;
  overflow: visible;
  border: 0;
}

.users-table-row {
  flex: 1 auto;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: stretch;
  align-content: center;
  align-items: stretch;
  position: relative;
}

.users-table-row::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 5000px;
  height: 1px;
  background: #999;
  transform: translateX(-50%);
}

.users-table-row:last-child::after {
  display: none;
}

.users-table-row__cell {
  flex: 1 50%;
  padding: 0.5rem;
}

.users-table-row__cell + .users-table-row__cell {
  border-left: 1px solid #999;
  flex: 0 0 480px;
}
</style>
