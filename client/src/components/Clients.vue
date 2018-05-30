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
      <div v-if="loadingClients">Loading...</div>
      <b-table v-if="!loadingClients" class="clients-table" responsive :items="clients" :fields="fields">
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
    <b-modal id="modalClient" ref="modalClient" size="lg" :title="title" :ok-title="okTitle" @ok.prevent="saveClient" @cancel.prevent="cancelClient" :visible="false">
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
            <div v-if="loadingProviders">Loading...</div>
            <b-list-group v-if="!loadingProviders">
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
      clients: [],
      providers: [],
      loadingClients: true,
      loadingProviders: true,
      currentClient: {},
      provider: {}
    }
  },
  created: function() {
    this.loadClients();
    this.loadProviders();
  },
  computed: {
    title() {
      return this.currentClient._id ? 'Edit client' : 'New client';
    },
    okTitle() {
      return this.currentClient._id ? 'Update client' : 'Add client';
    }
  },
  methods: {
    async loadClients() {
      try {
        this.loadingClients = true;
        let result = await this.$http.get('/clients');
        this.clients = result.data;
        this.loadingClients = false;
      } catch (error) {
        this.$notify({
          type: 'error',
          text: 'Can\'t fetch clients'
        });
      }
    },
    async loadProviders() {
      try {
        this.loadingProviders = true;
        let result = await this.$http.get('/providers');
        this.providers = result.data;
        this.loadingProviders = false;
      } catch (error) {
        this.$notify({
          type: 'error',
          text: 'Can\'t fetch providers'
        });
      }
    },
    addClient() {
      this.currentClient = {};
      this.showModal();
    },
    editClient(client) {
      this.currentClient = client;
      this.showModal();
    },
    async removeClient(client) {
      try {
        await this.$http.delete(`/clients/${client._id}`);
        this.clients.splice(this.clients.indexOf(client));
        this.$notify({
          type: 'success',
          text: 'Client deleted'
        });
      } catch (error) {
        this.$notify({
          type: 'error',
          text: 'Can\'t delete client'
        });
      }
    },
    async saveClient(e) {
      try {
        if (!this.currentClient._id) {
          let result = await this.$http.post('/clients', this.currentClient);
          let client = result.data;
          this.$notify({
            type: 'success',
            text: 'Client created'
          });
          this.clients.push(client);
        } else {
          await this.$http.put(`/clients/${this.currentClient._id}`, this.currentClient);
          this.$notify({
            type: 'success',
            text: 'Client updated'
          });
        }
        this.hideModal();
        this.reset();
      } catch (error) {
        this.$notify({
          type: 'error',
          text: 'Can\'t save client'
        });
      }
    },
    cancelClient() {
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
