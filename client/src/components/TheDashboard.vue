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
            <v-toolbar-title>Factories</v-toolbar-title>
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
                  New Item
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
                          v-model="editedItem.factoryName"
                          label="Factory Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.membershipStart"
                          label="Membership Start"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.membershipEnd"
                          label="Membership Start"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.employeeCount"
                          label="Employee Count"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-select
                          :items="[false, true]"
                          v-model="editedItem.specialMember"
                          label="Special Member"
                        ></v-select>
                        <!-- <v-text-field
                          v-model="editedItem.specialMember"
                          label="Special Member"
                        ></v-text-field> -->
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'TheDashboard',

  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Factories',
        align: 'start',
        sortable: false,
        value: 'factoryName',
      },
      { text: 'Membership Start', value: 'membershipStart' },
      { text: 'Membership End', value: 'membershipEnd' },
      { text: 'Employee Count', value: 'employeeCount' },
      { text: 'Special Member', value: 'specialMember' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    factoryData: [],
    editedIndex: -1,
    editedItem: {
      factoryName: '',
      membershipStart: '',
      membershipEnd: '',
      employeeCount: 0,
      specialMember: false,
    },
    defaultItem: {
      factoryName: '',
      membershipStart: '',
      membershipEnd: '',
      employeeCount: 0,
      specialMember: false,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
    this.getFactories()
  },

  methods: {
    async getFactories() {
      const res = await axios.get('/api/factories')
      res.data.forEach((factory) => {
        factory.membershipStart = factory.membershipStart.slice(0, 10)
        factory.membershipEnd = factory.membershipEnd.slice(0, 10)
      })

      this.factoryData = res.data
      console.log(res)
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

    deleteItemConfirm() {
      console.log(this.editedItem.factoryName) // FACTORY NAME WILL BE USE TO DELETE REQUEST
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

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.factoryData[this.editedIndex], this.editedItem)
      } else {
        this.factoryData.push(this.editedItem)
        console.log(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
