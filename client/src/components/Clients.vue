<template lang="html">
  <div id="clients">
    <b-container>
      <header class="d-flex justify-content-between align-items-center rounded-top">
        <div>
          <h2 class="title text-info">Clients</h2>
        </div>
        <div>
          <b-button id="newClient" variant="outline-secondary">New client</b-button>
        </div>
      </header>
      <b-table responsive :items="clients" :fields="fields"></b-table>
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
        { key: 'providers', sortable: false },
        { key: '' }
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
#clients {
  margin-top: 10%;
}
#clients header {
  padding: 10px;
  background-color: #f4f4ff;
}
</style>
