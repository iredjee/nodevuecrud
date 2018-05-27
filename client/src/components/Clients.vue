<template lang="html">
  <div id="clients">
    <b-container>
      <!-- Header -->
      <header class="d-flex justify-content-between align-items-center rounded-top">
        <div>
          <h2 class="title text-info">Clients</h2>
        </div>
        <div>
          <b-button class="btn-new-client" variant="outline-secondary" @click="addClient">
            <i class="fas fa-plus"></i> New client
          </b-button>
        </div>
      </header>

      <!-- Table -->
      <b-table class="clients-table" responsive :items="clients" :fields="fields">
        <template slot="options" slot-scope="data">
          <div class="d-flex justify-content-end align-items-center options">
            <b-button class="options-btn options-edit" variant="warning" size="sm" @click="editClient(data.item)">
              <i class="fas fa-edit"></i>
            </b-button>
            <b-button class="options-btn options-delete" variant="danger" size="sm" @click="removeClient(data.item)">
              <i class="fas fa-trash-alt"></i>
            </b-button>
          </div>
        </template>
      </b-table>
    </b-container>

    <!-- Modal -->
    <b-modal id="modalClient" ref="modalClient" size="lg" :title="title" ok-title="Add client" @ok.prevent="saveClient" @cancel.prevent="cancelClient" :visible="true">
      <b-form-group>
        <b-form-input type="text" v-model="currentClient.name" required placeholder="Name"></b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-input type="email" v-model="currentClient.email" required placeholder="Email"></b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-input type="tel" v-model="currentClient.phone" required placeholder="Phone"></b-form-input>
      </b-form-group>
      <b-form-group>
        <b-row>
          <b-col md="8">
            <b-form-input type="text" v-model="provider.name" placeholder="Provider"></b-form-input>
          </b-col>
          <b-col md="4">
            <b-button :block="true" @click.prevent="saveProvider">Add Provider</b-button>
          </b-col>
        </b-row>
      </b-form-group>
      <b-form-group>
        <b-row>
          <b-col md="8">
            <b-list-group>
              <b-list-group-item v-for="provider in providers" :key="provider.id">
                {{ provider.name }}
              </b-list-group-item>
            </b-list-group>
          </b-col>
        </b-row>
      </b-form-group>
    </b-modal>
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
        { key: 'options', label: '' }
      ],
      clients: [
        { id: 1, name: 'Name1', email: 'Email3', phone: 'Phone', providers: '' },
        { id: 2, name: 'Name2', email: 'Email2', phone: 'Phone', providers: '' },
        { id: 3, name: 'Name3', email: 'Email1', phone: 'Phone', providers: '' }
      ],
      providers: [
        { id: 1, name: 'PName1' },
        { id: 2, name: 'PName2' },
        { id: 3, name: 'PName3' },
        { id: 4, name: 'PName4' },
        { id: 5, name: 'PName5' }
      ],
      currentClient: {},
      provider: {}
    }
  },
  computed: {
    title() {
      return this.currentClient.id ? 'Edit client': 'New client';
    }
  },
  methods: {
    addClient() {
      console.log('Add client');
      this.currentClient = {};
      this.showModal();
    },
    editClient(client) {
      console.log('Edit client');
      this.currentClient = client;
      this.showModal();
    },
    removeClient(client) {
      console.log('Remove client');
    },
    saveClient(e) {
      console.log('Save client');
      // TODO: Save
      this.hideModal();
      this.reset();
    },
    cancelClient() {
      console.log('Cancel client');
      // TODO: Cancel
      this.hideModal();
      this.reset();
    },
    reset() {
      this.currentClient = {};
    },
    showModal() {
      this.$refs.modalClient.show();
    },
    hideModal() {
      this.$refs.modalClient.hide();
    },
    saveProvider() {
      console.log('Save provider');
      // TODO: Save
      this.providers.push(this.provider);
    }
  }
}
</script>

<style lang="scss" scoped>
#clients {
  margin-top: 10%;

  header {
    padding: 10px;
    background-color: #f4f4ff;
  }

  .options {
    .options-btn {
      margin: 2px;
    }
  }
}
</style>
