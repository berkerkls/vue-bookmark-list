<template>
  <v-container>
    <v-row justify="end">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="#ffd700"
            dark
            v-bind="attrs"
            v-on="on"
            @click="clickStop"
          >
            Open Dialog
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">User Profile</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="userData.id"
                    label="Enter an id*"
                    hint="example of persistent helper text"
                    type="number"
                    persistent-hint
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Title"
                    v-model="userData.title"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="userData.url"
                    label="Enter an url"
                    type="url"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="onSave"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-table theme="light">
      <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Title</th>
          <th class="text-left">URL</th>
          <th class="text-left">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in userArr" :key="index">
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.url }}</td>
          <td>
            <v-btn color="error" variant="flat" @click="onDelete(item)"
              >Delete</v-btn
            >
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
  <RouterView />
</template>

<script lang="ts">
import { isTemplateNode } from "@vue/compiler-core";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  data: () => {
    return {
      dialog: false,
      userData: {
        title: null,
        url: null,
        id: null,
      },
      userArr: [],
    };
  },
  methods: {
    clickStop() {
      this.dialog = true;
    },
    onSave() {
      this.dialog = false;
      this.$appAxios.post("/bookmarks", this.userData).then((res: any) => {
        this.userArr.push(res.data);
      });
      this.userData.title = null;
      this.userData.id = null;
      this.userData.url = null;
    },
    onDelete(item: object) {
      this.$appAxios.delete(`/bookmarks/${item.id}`).then((res: any) => {
        if (res.status === 200) {
          this.userArr = this.userArr.filter((el) => el.id !== item.id);
        }
      });
    },
  },
  created() {
    this.$appAxios.get("/bookmarks").then((res: any) => {
      this.userArr = res.data;
      console.log(this.userArr);
    });
  },
});
</script>
