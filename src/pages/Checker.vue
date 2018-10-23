<template>
    <div class="content">

        <code>{{console}}</code>
        <md-dialog :md-active.sync="showDialog" id="checker">
            <md-dialog-title>Enter URLs</md-dialog-title>

            <div class="content">
                <md-field>

                    <md-textarea v-model="userData"></md-textarea>

                </md-field>
            </div>

            <md-dialog-actions>
                <md-button class="md-primary" @click="listOfURLS()">Save</md-button>
            </md-dialog-actions>
        </md-dialog>

        <md-button class="md-primary md-raised" @click="showDialog = true">Enter URLs</md-button>

        
        <md-table v-model="searched" md-fixed-header md-sort="url" md-sort-order="asc" md-card id="checkerTable">
            <md-table-toolbar>
                <div class="md-toolbar-section-start">
                <h1 class="md-title">URLs</h1>

    </div>
    <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by URL..." v-model="search" @input="searchOnTable" />
        </md-field>

            </md-table-toolbar>


            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="URL" md-sort-by="url" class="url-class">{{ item.url }}</md-table-cell>

                <md-table-cell md-label="Status" md-sort-by="init_status" class="url-class"><span :class="'_'+item.init_status">{{ item.init_status }}</span> <span
                        v-if="item.final_status != ''"><md-icon>arrow_forward</md-icon></span> <span :class="'_'+item.final_status">{{ item.final_status }}</span>
                </md-table-cell>
                <md-table-cell md-label="Final Destination" class="url-class">{{ item.redirections.final }}
                </md-table-cell>
                <md-table-cell md-label="# of Redirects" md-numeric class="url-class"><span
                        v-if="item.redirections">{{getCount(item.redirections)}} <md-icon>help</md-icon>
          <md-tooltip md-direction="left" id="checker-tooltip"><div class="text-left"
                                                                    v-for="(redirect, key) in item.redirections"
                                                                    v-if="popObject(redirect, key)" :key="key"><md-icon
                  v-if="key != 0">subdirectory_arrow_right</md-icon> {{popObject(redirect, key)}}</div></md-tooltip></span>

                </md-table-cell>
            </md-table-row>
            <md-progress-bar id="checker-bar" md-mode="determinate" :md-value="loadingValue"></md-progress-bar>
        </md-table>

    </div>
</template>


<script>
    import axios from 'axios';
const toLower = text => {
    return text.toString().toLowerCase()
  }

const searchByName = (items, term) => {

    if (term) {
      return items.filter(item => toLower(item.url).includes(toLower(term)))
    }

    return items
  }

    export default{
        data() {
            return {
                userData: 'google.com\nfacebook.com',
                search: null,
      searched: [],
                finalData: [],
                showDialog: false,
                loading: false,
                console: '',
                loadingValue: 0,
            }
        },

        methods: {
            searchOnTable () {
                this.searched = searchByName(this.finalData, this.search)
      },
            getCount: function (object) {
                return Object.keys(object).length - 2
            },
            popObject: function (object, index) {
                if (index != 'final') {
                    return object
                } else {
                    return false
                }
            },
            listOfURLS: function () {

                

                this.showDialog = false
                var newArr = this.userData.split("\n")

                for (var uri in newArr) {
                    var tempArr = new Object;
                    tempArr['url'] = newArr[uri]
                    tempArr['init_status'] = ''
                    tempArr['final_status'] = ''
                    tempArr['redirections'] = ''
                    tempArr['loading'] = false

                    this.finalData.push(tempArr)
                    setInterval(this.icnrementLoading, 200)


                }

                this.checkURLS()
            },

            icnrementLoading: function(){
                    this.loadingValue++
            },

            checkURLS: function () {

                var promises = []

                for (var item in this.finalData) {
                    var currentUrl = this.finalData[item]
                    this.finalData[item].loading = true
                    //api request
                    promises.push(axios.get("https://www.nrdevsites.com/301check/status.php?url=" + currentUrl.url))
                    //end pai request


                }
                axios.all(promises).then(results => {


                    for (var i = 0; i < results.length; i++) {
                        var response = results[i]
                        this.finalData[i].loading = false
                        this.finalData[i].init_status = response.data.init_status

                        if (response.data.final_status) {
                            this.finalData[i].final_status = response.data.final_status
                        }

                        if (response.data.redirections) {
                            this.finalData[i].redirections = response.data.redirections
                        }

                        this.showDialog = true
                        this.showDialog = false

                        this.loadingValue = (((i + 1) / results.length) * 100)
                    }


                })

            }
        },
        created () {
      this.searched = this.finalData
    }
    }
</script>
<style>
    #checker {
        padding: 30px;
    }

    #checker textarea {
        width: 800px;
        max-width: 100%;
        border: 1px solid #ccc;
        min-height: 400px;
        background: #f8f8f8;
    }

    #checkerTable .md-table-head-label {
        padding-left: 24px;
        font-weight: 600;
        font-size: 12px;
    }

    #checkerTable td {
        padding-left: 20px;
        padding-right: 20px;
    }

    #checker-bar.md-progress-bar.md-theme-default.md-determinate .md-progress-bar-fill {
        background-color: #66bb6a;
    }

    #checker-bar.md-progress-bar.md-theme-default.md-determinate {
        background-color: rgba(102, 187, 106, 0.3803921568627451);
    }

    #checker-tooltip {
        background-color: #575757 !important;
        color: #fff !important;

    }

    #checker-tooltip:after {
        border-left-color: #575757;
    }

    #checker-tooltip .md-icon {
        color: #fff;
    }

    #checkerTable tr th:first-child, tr td:first-child {
        width: 400px !important;
    }

    #checkerTable tr th:nth-child(2), tr td:nth-child(2) {
        width: 200px !important;
    }

    #checkerTable tr th:last-child div, tr td:last-child div {
        text-align: right !important;
        justify-content: flex-end;
    }

    ._301
    {
        color:#ffa21a;
        font-weight:600;
    }

    ._200
    {
        color:#43a047;
        font-weight:600;
    }

    ._404
    {
        color:#f44336;
        font-weight: 600;
    }

    ._0
    {
        color:#464646;
    }
</style>

