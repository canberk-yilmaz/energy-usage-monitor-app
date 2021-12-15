<template>
  <v-container>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="factoryData"
        sort-by="calories"
        class="elevation-1 mt-5"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>{{ $t('dashboard.factories') }}</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  {{ $t('dashboard.newItemLower') }}
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.factoryname"
                          label="Factory Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.membershipstart"
                          label="Membership Start"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.membershipend"
                          label="Membership End"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.employeecount"
                          label="Employee Count"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-select
                          :items="[false, true]"
                          v-model="editedItem.specialmember"
                          label="Special Member"
                        ></v-select>
                        <!-- <v-text-field
                          v-model="editedItem.specialmember"
                          label="Special Member"
                        ></v-text-field> -->
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    {{ $t('dashboard.dialogDelete.cancel') }}
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save">
                    {{ $t('dashboard.dialogDelete.save') }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >{{ $t('dashboard.dialogDelete.title') }}
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">{{
                    $t('dashboard.dialogDelete.cancel')
                  }}</v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="deleteItemConfirm"
                    >{{ $t('dashboard.dialogDelete.ok') }}</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="getFactoryUsage(item)">
            mdi-view-dashboard
          </v-icon>
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <!-- <v-card>
      <router-link
        :to="{ name: 'factory', query: { factory: this.selectedFactory } }"
        >Hello1</router-link
      ></v-card
    > -->
    <router-view :key="$route.path"></router-view>
  </v-container>
</template>

<script>
import axios from 'axios'
import i18n from '@/i18n'

export default {
  name: 'TheDashboard',

  data: () => ({
    dialog: false,
    dialogDelete: false,
    selectedFactory: '',
    headers: [
      {
        text: i18n.t('dashboard.factories'),
        align: 'start',
        sortable: false,
        value: 'factoryname',
      },
      {
        text: i18n.t('dashboard.membershipStart'),
        value: 'membershipstart',
      },
      { text: i18n.t('dashboard.membershipEnd'), value: 'membershipend' },
      { text: i18n.t('dashboard.employeeCount'), value: 'employeecount' },
      { text: i18n.t('dashboard.specialMember'), value: 'specialmember' },
      { text: i18n.t('dashboard.actions'), value: 'actions', sortable: false },
    ],
    //factoryData: [],
    editedIndex: -1,
    editedItem: {
      factoryname: '',
      membershipstart: '',
      membershipend: '',
      employeecount: 0,
      specialmember: false,
    },
    defaultItem: {
      factoryname: '',
      membershipstart: '',
      membershipend: '',
      employeecount: 0,
      specialmember: false,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    factoryData() {
      return this.$store.state.factoryData
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.getAllFactories()
  },

  methods: {
    getFactoryUsage(value) {
      console.log(value.factoryname)
      this.$router.push({
        name: 'factory',
        params: { factoryname: value.factoryname },
      })
    },
    getAllFactories() {
      this.$store.dispatch('getFactories')
    },

    editItem(item) {
      this.editedIndex = this.factoryData.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.factoryData.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      try {
        const res = await axios.delete('/factories', {
          data: { factoryname: this.editedItem.factoryname },
        })
        console.log(res)
      } catch (err) {
        console.log(err)
      }

      console.log(this.editedItem.factoryname)
      this.factoryData.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save() {
      if (this.editedIndex > -1) {
        try {
          await axios.patch('/factories', {
            factoryname: this.editedItem.factoryname,
            membershipstart: this.editedItem.membershipstart,
            membershipend: this.editedItem.membershipend,
            employeecount: this.editedItem.employeecount,
            specialmember: this.editedItem.specialmember,
          })
        } catch (err) {
          console.log(err)
        }
        Object.assign(this.factoryData[this.editedIndex], this.editedItem)
        //edit
      } else {
        //add new row
        try {
          await axios.post('/factories', {
            factoryname: this.editedItem.factoryname,
            membershipstart: this.editedItem.membershipstart,
            membershipend: this.editedItem.membershipend,
            employeecount: this.editedItem.employeecount,
            specialmember: this.editedItem.specialmember,
          })
        } catch (err) {
          console.log(err)
        }
        this.factoryData.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
