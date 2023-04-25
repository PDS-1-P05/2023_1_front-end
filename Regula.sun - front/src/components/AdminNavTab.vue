<template>
    <div id="tab-wrapper">
        <v-tabs
            v-model="page"
            class="tabs"
            data-test="tabs"
        >
            <v-tab value="Indicadores" class="tab" data-test="indicadores">Indicadores</v-tab>
            <v-tab value="Metas" class="tab" data-test="metas">Metas</v-tab>
        </v-tabs>
    </div>
</template>

<script>

    export default {
        props: {
            tab: null
        },

        data() {
            return {
                page: null,
                mySelectedClass: 'my-selected-class'
            }
        },

        watch: {
            page(newPage) {
                this.$emit('alteraPage', newPage)
            },

            tab(newTab) {
                this.page = newTab;
            }
        }
    }

</script>

<style scoped>

.tabs {
    color: var(--corPrimaria);
}

.tab .v-btn:hover > .v-btn__overlay {
    opacity: 0;
}


</style>