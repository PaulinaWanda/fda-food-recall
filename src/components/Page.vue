<template>
    <div>
        <pagination-bar
            :active-page="activePage"
            :pages-count="pagesCount"
            :results-per-page="resultsPerPage"
            :results-count="resultsCount"
            @changePage="setActivePage"
        />
        <ul v-if="results && results.length">
            <li
                v-for="(result, index) of results"
                :key="index"
            >
                <p><strong>{{ result.reason_for_recall }}</strong></p>
                <p>{{ result.product_description }}</p>
            </li>
        </ul>

        <ul v-if="errors && errors.length">
            <li
                v-for="(error, index) of errors"
                :key="index"
            >
                {{ error.message }}
            </li>
        </ul>
    </div>
</template>

<script>
import PaginationBar from './PaginationBar'

export default {
    name: 'Page',
    components: {
        PaginationBar
    },
    data () {
        return {
            baseUrl: 'https://api.fda.gov/food/enforcement.json',
            activePage: 1,
            pagesCount: 1,
            resultsPerPage: 100,
            resultsCount: 0,
            results: [],
            errors: []
        }
    },
    computed: {},
    watch: {
        activePage (value) {
            this.updateFoodRecallData(value)
        }
    },
    created () {
        this.$axios.get(`${this.baseUrl}?limit=${this.resultsPerPage}`)
            .then(response => {
                this.setResults(response.data.results)
                this.setResultsCount(response.data.meta.results.total)
                this.setPagesCount([this.resultsCount, this.resultsPerPage])
            })
            .catch(e => {
                this.updateErrors(e)
            })
    },
    methods: {
        setActivePage (pageNumber) {
            this.activePage = pageNumber
        },
        setPagesCount ([resultsCount, resultsPerPage]) {
            this.pagesCount = Math.ceil(resultsCount / resultsPerPage)
        },
        setResultsCount (resCount) {
            this.resultsCount = resCount
        },
        setResults (res) {
            this.results = res
        },
        updateErrors (err) {
            this.errors.push(err)
        },
        removeErrors () {
            this.errors = []
        },
        updateFoodRecallData (pageNum) {
            this.removeErrors()
            this.$axios.get(`${this.baseUrl}?limit=${this.resultsPerPage}&skip=${(pageNum - 1) * this.resultsPerPage}`)
                .then(response => {
                    this.setResults(response.data.results)
                })
                .catch(e => {
                    this.updateErrors(e)
                })
        }
    }
}
</script>

<style scoped>
    ul {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        grid-auto-flow: row dense;
        grid-gap: 10px;
        list-style: none;
        padding-left: 0;
    }

    li {
        border: 1px solid #666;
        padding: 10px;
    }
</style>
