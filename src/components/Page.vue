<template>
    <div>
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
import axios from 'axios'

export default {
    name: 'Page',
    data () {
        return {
            results: [],
            errors: []
        }
    },
    created () {
        axios.get(`https://api.fda.gov/food/enforcement.json?limit=10&skip=5`)
            .then(response => {
                // JSON responses are automatically parsed.
                this.results = response.data.results
            })
            .catch(e => {
                this.errors.push(e)
            })
    }
}
</script>
