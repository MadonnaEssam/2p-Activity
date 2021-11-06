<template>
<b-container fluid>
    <h1>Activity List<span>★</span></h1>
    <b-btn @click="addRow" variant="primary" class="btn btn-blue float-end fas fa-plus "></b-btn>
    <b-table :items="items" :fields="fields" class="tableColor" ref='table'>
        <template v-slot:cell()="{item, value, field: { key }}">
            <template v-if="key=='status'">
                <button type="button" :class="'btn btn-toggle '+(item.status!=1? '':'active')" @click="onSave(item)" data-toggle="button">
                    <div class="handle"></div>
                </button>
            </template>
            <template v-else>{{value}}</template>
        </template>
        <template v-slot:cell(actions)="{ item }">
            <b-button @click="onDelete(item)" variant="primary" class="btn btn-blue fas fa-trash "></b-button>
        </template>
    </b-table>

    <b-modal id="modal-1" ref="modal-1" title="Create an Acitivty" @hide="hideModel" hide-footer no-close-on-backdrop>
        <b-form @submit.stop.prevent="addRow(form)" class="form">
            <b-row>
                <b-col class="pl-1 pr-1 col">
                    <b-form-group id="input-group-1" label="Acitivty Name:" label-for="input-1">
                        <b-form-input id="input-1" name="input-1" v-model="form.acitivtyName" required aria-describedby="input-1-live-feedback"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col class="pl-1 pr-1 col">
                    <b-form-group id="input-group-1" label="Status:" label-for="input-1">
                        <div class="status row m-0">
                            <div class="col-md-6 col-sm-6 p-0">
                                <div class="c-radio">
                                    <label class="w-100">
                                        <input type="radio" name="status" v-model="form.status" value=1 id="Complete" checked="checked" />
                                        <span class="fa fa-check"></span>
                                        <label for="Complete">Complete</label>
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-6 col-sm-6 p-0">

                                <div class="c-radio">
                                    <label class="w-100">
                                        <input type="radio" name="status" v-model="form.status" value=0 id="NotComplete" />
                                        <span class="fa fa-check"></span>
                                        <label for="NotComplete">Not Complete</label>
                                    </label>
                                </div>
                            </div>
                        </div>

                    </b-form-group>
                </b-col>
            </b-row>
            <hr />
            <div class="float-end ">
                <b-button class="btn btn-success" variant="success" @click="add(form)">Add</b-button>
                <b-button class="btn ml-2 btn-danger" variant="danger" @click="hideModel()">Cancel</b-button>
            </div>
        </b-form>
    </b-modal>
</b-container>
</template>

<script>
import Vue from 'vue'
import swal from "sweetalert2";

export default {
    data() {
        return {
            edit: null,
            items: [],
            form: {
                status: null,
                acitivtyName: null
            },
            fields: [{
                    key: 'id',
                    label: 'Acitivity id',
                    sortable: true,
                    class: 'text-center'
                }, {
                    key: 'name',
                    label: 'Acitivity Name',
                    sortable: true,
                    sortDirection: 'desc'
                },
                {
                    key: 'status',
                    label: 'Status (Completed)',
                },
                {
                    key: 'actions',
                    label: 'Actions'
                }
            ],

        }
    },

    computed: {
        rows() {
            return this.employees.length
        }
    },
    mounted() {
        if (!window.localStorage.activity) {
            this.getActivityList();
        } else {
            this.items = JSON.parse(window.localStorage.activity);
        }
    },
    methods: {
        hideModel() {
            this.form.status = null;
            this.form.acitivtyName = null;
            this.$bvModal.hide('modal-1')
        },
        add(form) {
            var self = this;
            Vue.Invoke("put", form,
                function () {
                    self.items.push({
                        name: form.acitivtyName,
                        status: Number(form.status),
                        id: self.items.length + 1
                    });
                    self.notify('success', 'Activity added successfully')
                    self.hideModel()

                })
        },
        addRow() {
            this.$refs["modal-1"].show();
        },
        onDelete(item) {
            swal({
                title: "are you sure you want to delete this acitivty?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                showCloseButton: true,
                heightAuto: false,
            }).then((result) => {
                if (result.value == true) {
                    console.log(item);
                    var self = this;
                    Vue.Invoke("delete", item.id,
                        function () {
                            self.notify('success', 'Activity deleted successfully');
                            var index = self.items.findIndex(e => e.id == item.id)
                            if (index != -1) {
                                self.items.splice(index, 1);
                            }
                        })
                }
            });

        },
        onSave(item) {
            var self = this;
            Vue.Invoke("post", item,
                function () {
                    self.$set(item, 'status', !item.status)
                    self.notify('success', 'Activity updated successfully')
                })
        },
        getActivityList() {
            var self = this;
            Vue.Invoke("get", null,
                function (response) {
                    window.localStorage.activity = JSON.stringify(response)
                    self.items = response;
                    self.totalRows = self.items.length
                })

        },
        notify(variant = null, msg) {
            this.$root.$bvToast.toast(msg, {
                noCloseButton: true,
                variant: variant,
                solid: true,
                autoHideDelay: 50000,
            })
        },

    }
}
</script>

<style>
.container-table100 {
    width: 100%;
    background: #fff;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 33px 30px;
}

.table {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0px 40px 0px rgb(0 0 0 / 15%);
    -moz-box-shadow: 0 0px 40px 0px rgba(0, 0, 0, 0.15);
    -webkit-box-shadow: 0 0px 40px 0px rgb(0 0 0 / 15%);
    -o-box-shadow: 0 0px 40px 0px rgba(0, 0, 0, 0.15);
    -ms-box-shadow: 0 0px 40px;
}

.table th {
    padding-top: 18px !important;
    padding-bottom: 18px !important;
}

.table th {
    font-size: 18px !important;
    color: #fff;
    line-height: 1.4 !important;
    background-color: #51c6ea !important;
}

.container-fluid {
    width: 90% !important;

}

.table tr:nth-child(even) {
    background-color: #79cce526 !important;
}

.btn-blue {
    color: #fff !important;
    background-color: #23b7e5 !important;
    border-color: #29b5a8 !important;
    margin-right: 5px !important;
}

.btn-toggle {
    border-radius: 1.5rem !important;
    margin: 0 4rem;
    padding: 0;
    position: relative;
    border: none;
    height: 1.5rem;
    width: 3rem;
    border-radius: 1.5rem;
    color: #29b5a8 !important;
    background-color: #29b5a8 !important;
}

.btn-toggle:before,
.btn-toggle:after {
    line-height: 1.5rem;
    width: 4rem;
    text-align: center;
    font-weight: 600;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: absolute;
    bottom: 0;
    transition: opacity 0.25s;
}

.btn-toggle:before {
    content: "No";
    left: -4rem;
}

.btn-toggle:after {
    content: "Yes";
    right: -4rem;
    opacity: 0.5;
}

.btn-toggle>.handle {
    position: absolute;
    top: 0.1875rem;
    left: 0.1875rem;
    width: 1.125rem;
    height: 1.125rem;
    border-radius: 1.125rem;
    background: #fff;
    transition: left 0.25s;
}

.btn-toggle.active {
    transition: background-color 0.25s;
}

.btn-toggle.active>.handle {
    left: 1.6875rem;
    transition: left 0.25s;
}

.btn-toggle.active:before {
    opacity: 0.5;
}

.btn-toggle.active:after {
    opacity: 1;
}

.btn-toggle:before,
.btn-toggle:after {
    color: #6b7381;
}

.btn-toggle.active {
    background-color: #29b5a8;
}

h1 {
    font-size: 15px;
    text-align: center;
    margin: 0 auto;
    display: inline-block;
}

h1>span {
    font-size: 15px;
    position: relative;
    display: block;
}

h1>span:after,
h1>span:before {
    content: '';
    background: #ec6d48;
    height: 1px;
    width: 50%;
    position: absolute;
    top: 50%;
}

span:before {
    left: -15px;
}

span:after {
    right: -15px;
}

.c-radio {
    margin-right: 4px;
    cursor: pointer;
}

.c-radio input {
    opacity: 0;
    position: absolute;
    margin-left: 0 !important;
}

input[type=checkbox],
input[type=radio] {
    box-sizing: border-box;
    padding: 0;
}

.c-radio input[type=radio]:checked+span {
    background-color: #fff;
}

.c-radio input[type=checkbox]:checked+span,
.c-radio input[type=radio]:checked+span {
    border-color: #23b7e5;
    background-color: #fff;
}

.c-radio span {
    border-radius: 50%;
    position: relative;
    display: inline-block;
    vertical-align: top;
    width: 20px;
    height: 20px;
    border: 1px solid #ccc;
    margin-right: 5px;
    text-align: center;
}

.c-radio span:before {
    margin-left: 1px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    text-align: center !important;
    font-size: 12px;
    line-height: 18px;
    vertical-align: middle;
}

.c-radio input[type=radio]:checked+span:before {
    color: #23b7e5;
    opacity: 1;
    transition: color .3s ease-out;
}

.fa-check:before {
    content: "\F00C";
}

.btn-success {
    margin-right: 5px;
    font-size: 13px;
    background-color: #70d0a1 !important;
    border-color: #70d0a1 !important;
    color: #fff !important;
}

.close {
    float: right;
    font-size: 1.5rem !important;
    font-weight: 700;
    line-height: 1;
    color: #000;
    text-shadow: 0 1px 0 #fff;
    opacity: .5;
    background-color: transparent !important;
    border: 0 !important;
    appearance: none !important;
}

label {
    font-family: Source Sans Pro, sans-serif;
    color: #656565;
    font-size: .875rem;
}

.form-control {
    display: block;
    width: 100%;
    height: 2.1875rem;
    padding: 0.375rem 1rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.52857;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #dde6e9;
    border-radius: 0.25rem;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}
</style>
