<style lang="scss">
    .loading {
        animation: loading 2s infinite running cubic-bezier(.68,-0.55,.27,1.55);
        display: inline-block;
        width: 1.2em;
        height: 1.2em;
        vertical-align: middle;
    }
    @keyframes loading {
        from {
            transform: rotate(0deg)
        }
        to {
            transform: rotate(720deg)
        }
    }
</style>

<script lang="ts">
    import MdiLoading from "~icons/mdi/loading"
</script>


<div class="loading"><MdiLoading /></div>