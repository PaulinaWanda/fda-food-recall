import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        baseUrl: 'https://api.fda.gov/food/enforcement.json',
        activePage: 1,
        pagesCount: 1,
        resultsPerPage: 100,
        resultsCount: 0,
        results: [],
        errors: []
    },
    getters: {
        getBaseUrl: (state) => {
            return state.baseUrl
        },
        getActivePage: (state) => {
            return state.activePage
        },
        getPagesCount: (state) => {
            return state.pagesCount
        },
        getResultsPerPage: (state) => {
            return state.resultsPerPage
        },
        getResultsCount: (state) => {
            return state.resultsCount
        },
        getResults: (state) => {
            return state.results
        },
        getErrors: (state) => {
            return state.errors
        }
    },
    actions: {},
    mutations: {
        setActivePage (state, pageNumber) {
            state.activePage = pageNumber
        },
        setPagesCount (state, [resultsCount, resultsPerPage]) {
            state.pagesCount = Math.ceil(resultsCount / resultsPerPage)
        },
        setResultsCount (state, resCount) {
            state.resultsCount = resCount
        },
        setResults (state, results) {
            state.results = results
        },
        updateErrors (state, error) {
            state.errors.push(error)
        }
    }
})
