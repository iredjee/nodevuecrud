<template lang="html">
  <div id="clients">
    <b-container>
      <b-table striped hover responsive :items="clients" :fields="fields"></b-table>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        { key: 'name', sortable: true },
        { key: 'email', sortable: true },
        { key: 'phone', sortable: false },
        { key: 'providers', sortable: false }
      ],
      clients: [
        { name: 'Name1', email: 'Email3', phone: 'Phone', providers: '' },
        { name: 'Name2', email: 'Email2', phone: 'Phone', providers: '' },
        { name: 'Name3', email: 'Email1', phone: 'Phone', providers: '' }
      ]
    }
  }
}
</script>

<style lang="css" scoped>
</style>
