<template>
    <nav>
        <ul>
            <li>
                <button @click="showPreviousPage">
                    Previous
                </button>
            </li>
            <li>
                <button
                    v-for="index in pagesCount"
                    :class="pageIsActive(index)"
                    :key="index"
                    @click="setActivePage(index)"
                >
                    {{ index }}
                </button>
            </li>
            <li>
                <button @click="showNextPage">
                    Next
                </button>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'PaginationBar',
    props: {
        activePage: {
            default: () => {},
            type: Number
        },
        pagesCount: {
            default: () => {},
            type: Number
        },
        resultsPerPage: {
            default: () => {},
            type: Number
        },
        resultsCount: {
            default: () => {},
            type: Number
        }
    },
    data () {
        return {}
    },
    methods: {
        showPreviousPage () {
            if (this.activePage > 1) {
                this.$emit('changePage', this.activePage - 1)
            }
        },
        showNextPage () {
            if (this.activePage < this.pagesCount) {
                this.$emit('changePage', this.activePage + 1)
            }
        },
        setActivePage (pageNum) {
            this.$emit('changePage', pageNum)
        },
        pageIsActive (index) {
            return this.activePage === index ? 'active' : ''
        }
    }
}
</script>

<style scoped>
    nav {
    }

    ul {
        list-style: none;
        margin: 20px auto;
        padding-left: 0;
        display: flex;
        justify-content: center;
    }

    li {
        margin-left: 5px;
        margin-right: 5px;
    }

    li:nth-child(2) {
        width: 100%;
        display: grid;
        grid-gap: 2px;
        grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
        grid-auto-rows: 50px;
    }

    button {
        padding: 10px;
        font-size: 20px;
    }

    button.active {
        border: 3px solid #000;
    }
</style>
