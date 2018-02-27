<template>
    <div>
        <transition name="fade">
            <div
                v-show="dataIsLoading"
                class="spinner-container"
            >
                <div class="spinner"/>
            </div>
        </transition>
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

        <p v-if="error">{{ error.message }}</p>
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
            activePage: 1,
            baseUrl: 'https://api.fda.gov/food/enforcement.json',
            dataIsLoading: true,
            error: null,
            results: [],
            resultsCount: 0,
            resultsPerPage: 100
        }
    },
    computed: {
        url () {
            return `${this.baseUrl}?limit=${this.resultsPerPage}&skip=${(this.activePage - 1) * this.resultsPerPage}`
        },
        pagesCount () {
            return Math.ceil(this.resultsCount / this.resultsPerPage)
        }
    },
    watch: {
        activePage () {
            this.updateFoodRecallData()
        }
    },
    created () {
        this.getFoodRecallData()
    },
    methods: {
        getFoodRecallData () {
            this.$axios.get(this.url)
                .then(response => {
                    this.setResults(response.data.results)
                    this.setResultsCount(response.data.meta.results.total)
                    this.dataIsLoading = false
                })
                .catch(e => {
                    this.updateError(e)
                })
        },
        setActivePage (pageNumber) {
            this.activePage = pageNumber
        },
        setResultsCount (resCount) {
            this.resultsCount = resCount
        },
        setResults (res) {
            this.results = res
        },
        updateError (err) {
            this.error = err
        },
        removeResults () {
            this.results = []
        },
        removeError () {
            this.error = null
        },
        updateFoodRecallData () {
            this.dataIsLoading = true
            this.removeResults()
            this.removeError()
            this.getFoodRecallData()
        }
    }
}
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to {
        opacity: 0
    }
    .spinner-container {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        background-color: rgba(0,0,0,.4);
    }

    .spinner {
        width: 20vw;
        height: 20vw;
        margin: auto;
        background-color: #fff;
        border-radius: 100%;
        animation: scale-out 1s infinite ease-in-out;
    }

    @keyframes scale-out {
        0% {
            transform: scale(0);
            opacity: 0.9
        } 100% {
              transform: scale(1.0);
              opacity: 0;
          }
    }

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
