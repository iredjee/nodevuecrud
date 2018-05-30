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
        <template slot="providers" slot-scope="data">
          <template v-for="provider in data.item.providers">
            {{ provider.name }}
            <template v-if="data.item.providers.indexOf(provider) !== data.item.providers.length - 1">
              <br>
            </template>
          </template>
        </template>
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
    <b-modal id="modalClient" ref="modalClient" size="lg" :title="title" :ok-title="okTitle" @ok.prevent="saveClient" @cancel.prevent="cancelClient" :visible="true">
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
            <input class="form-control" type="text" v-model="provider.name" placeholder="Provider" @keyup.enter="addProvider"></input>
          </b-col>
          <b-col md="4">
            <b-button :block="true" @click.prevent="addProvider">Add Provider</b-button>
          </b-col>
        </b-row>
      </b-form-group>
      <b-form-group>
        <b-row>
          <b-col md="8">
            <div v-if="loadingProviders">Loading...</div>
            <b-list-group v-if="!loadingProviders">
              <b-list-group-item v-for="provider in providers" :key="provider._id" class="d-flex justify-content-between align-items-center">
                <div>
                  <b-form-checkbox v-model="provider.checked" v-if="!provider.editor">
                    {{ provider.name }}
                  </b-form-checkbox>
                  <template v-if="provider.editor">
                    <input class="form-control" type="text" v-model="provider.name" @keyup.enter="saveProvider(provider)"></input>
                  </template>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <template v-if="!provider.editor">
                    <b-button class="options-btn options-edit" variant="warning" size="sm" @click="editProvider(provider)">
                      <i class="fas fa-edit"></i>
                    </b-button>
                    <b-button class="options-btn options-delete" variant="danger" size="sm" @click="removeProvider(provider)">
                      <i class="fas fa-trash-alt"></i>
                    </b-button>
                  </template>
                  <template v-if="provider.editor">
                    <b-button class="options-btn options-edit" variant="success" size="sm" @click="saveProvider(provider)" title="Accept">
                      <i class="fas fa-check"></i>
                    </b-button>
                    <b-button class="options-btn options-delete" variant="danger" size="sm" @click="cancelProvider(provider)" title="Cancel">
                      <i class="fas fa-minus"></i>
                    </b-button>
                  </template>
                </div>
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
      provider: {
        checked: false,
        editor: false
      }
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
        this.providers = result.data.map(p => {
          p.checked = false;
          p.editor = false;
          return p;
        });
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
      for (let p of this.providers) {
        p.checked = this.currentClient.providers.find(pr => (pr.name === p.name)) ? true : false;
      }
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
        let checkedProviders = this.providers.filter(p => p.checked);
        let currentClient = {
          name: this.currentClient.name,
          email: this.currentClient.email,
          phone: this.currentClient.phone,
          providers: checkedProviders.map(p => p._id)
        };
        if (!this.currentClient._id) {
          let result = await this.$http.post('/clients', currentClient);
          let client = result.data;
          client.providers = checkedProviders;
          this.clients.push(client);
          this.$notify({
            type: 'success',
            text: 'Client created'
          });
        } else {
          await this.$http.put(`/clients/${this.currentClient._id}`, currentClient);
          this.currentClient.providers = checkedProviders;
          this.$notify({
            type: 'success',
            text: 'Client updated'
          });
        }
        this.hideModal();
        this.resetClient();
        this.resetProviders();
      } catch (error) {
        this.$notify({
          type: 'error',
          text: 'Can\'t save client'
        });
      }
    },
    cancelClient() {
      this.hideModal();
      this.resetClient();
      this.resetProviders();
    },
    resetClient() {
      this.currentClient = {};
    },
    showModal() {
      this.$refs.modalClient.show();
    },
    hideModal() {
      this.$refs.modalClient.hide();
    },
    async addProvider() {
      try {
        let provider = {
          name: this.provider.name
        };
        let result = await this.$http.post('/providers', provider);
        provider = result.data;
        provider.checked = false;
        provider.editor = false;
        this.providers.push(provider);
        this.resetProvider();
        this.$notify({
          type: 'success',
          text: 'Provider updated'
        });
      } catch (error) {
        this.$notify({
          type: 'error',
          text: 'Can\'t add provider'
        });
      }
    },
    async saveProvider(_provider) {
      try {
        let provider = { name: _provider.name };
        await this.$http.put(`/providers/${_provider._id}`, provider);
        _provider.editor = false;
        this.$notify({
          type: 'success',
          text: 'Provider updated'
        });
      } catch (error) {
        this.$notify({
          type: 'error',
          text: 'Can\'t add provider'
        });
      }
    },
    editProvider(provider) {
      provider.name_memo = provider.name;
      provider.editor = true;
    },
    cancelProvider(provider) {
      provider.name = provider.name_memo;
      delete provider.name_memo;
      provider.editor = false;
    },
    async removeProvider(provider) {
      try {
        await this.$http.delete(`/providers/${provider._id}`);
        this.providers.splice(this.providers.indexOf(provider));
        this.$notify({
          type: 'success',
          text: 'Provider deleted'
        });
      } catch (error) {
        this.$notify({
          type: 'error',
          text: 'Can\'t delete provider'
        });
      }
    },
    resetProviders() {
      for (let p of this.providers) {
        p.checked = false;
        p.editor = false;
      };
    },
    resetProvider() {
      this.provider = {};
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
