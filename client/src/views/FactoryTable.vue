<template>
  <v-container>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="this.factoryUsage"
        sort-by="calories"
        class="elevation-1 mt-5"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Factory Usage</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-if="false"
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
                          v-model="editedItem.factoryname"
                          label="Factory Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.department"
                          label="Department"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.daterange"
                          label="Date Range"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.electricalusage"
                          label="Electrical Usage"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.usagefee"
                          label="Usage Fee"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.discountedusagefee"
                          label="Discounted Usage Fee"
                        ></v-text-field>
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
        <template v-if="false" v-slot:[`item.actions`]="{ item }">
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
  name: 'FactoryTable',

  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Factory Name',
        align: 'start',
        sortable: false,
        value: 'factoryname',
      },
      { text: 'Units', value: 'department' },
      { text: 'Date Range', value: 'daterange' },
      { text: 'Electrical Usage', value: 'electricalusage' },
      { text: 'Usage Fee', value: 'usagefee' },
      { text: 'Discounted Usage Fee', value: 'discountedusagefee' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    factoryUsage: [],
    factoryname: '',
    editedIndex: -1,
    editedItem: {
      department: '',
      daterange: '',
      electricalusage: 0,
      usagefee: 0,
      discountedusagefee: 0,
    },
    defaultItem: {
      department: '',
      daterange: '',
      electricalusage: 0,
      usagefee: 0,
      discountedusagefee: 0,
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
    if (this.$route.params) {
      this.setFactoryName()
    }
    this.getFactoryUsage()
    //this.getAllFactoryDetails()
  },

  methods: {
    setFactoryName() {
      this.factoryname = this.$route.params.factoryname || ''
    },
    async getAllFactoryDetails() {
      try {
        const res = await axios.get('/api/factories/factoryusageall')
        // res.data.forEach((factory) => {
        //   factory.daterange = factory.daterange.slice(1, -1)
        // })
        this.factoryUsage = res.data
      } catch (error) {
        console.log(error)
      }
    },
    async getFactoryUsage() {
      try {
        const res = await axios.get('/api/factories/factoryusage', {
          params: {
            factoryname: this.factoryname,
          },
        })
        // res.data.forEach((factory) => {
        //   factory.daterange = factory.daterange.slice(1, -1)
        // })
        this.factoryUsage = res.data
      } catch (error) {
        console.log(error)
      }
    },

    editItem(item) {
      this.editedIndex = this.factoryUsage.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.factoryUsage.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      try {
        await axios.delete('http://localhost:3000/api/factories', {
          data: { factoryname: this.editedItem.factoryname },
        })
      } catch (err) {
        console.log(err)
      }

      this.factoryUsage.splice(this.editedIndex, 1)
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
          await axios.patch(
            'http://localhost:3000/api/factories/factoryusage',
            {
              factoryname: this.editedItem.factoryname,
              department: this.editedItem.department,
              daterange: this.editedItem.daterange,
              electricalusage: this.editedItem.electricalusage,
              usagefee: this.editedItem.usagefee,
              discountedusagefee: this.editedItem.discountedusagefee,
            }
          )
        } catch (err) {
          console.log(err)
        }
        Object.assign(this.factoryUsage[this.editedIndex], this.editedItem)
        //edit
      } else {
        //add new row
        // try {
        //   const res = await axios.post('http://localhost:3000/api/factories', {
        //     factoryname: this.editedItem.factoryname,
        //     membershipstart: this.editedItem.membershipstart,
        //     membershipend: this.editedItem.membershipend,
        //     employeecount: this.editedItem.employeecount,
        //     specialmember: this.editedItem.specialmember,
        //   })
        //   console.log(res)
        // } catch (err) {
        //   console.log(err)
        // }
        this.factoryUsage.push(this.editedItem)
        console.log(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
