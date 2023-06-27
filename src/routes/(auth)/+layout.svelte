<style lang="scss">
    .container {
        display: flex;
    }
    .image {
        width: 50%;
        height: 100vh;
        background-image: url(https://picsum.photos/960/1080);
        filter: brightness(.7);
    }

    main {
        width: 50%;
        height: 100vh;
        background-color: #181a1b;
        color: white;
        display: block;
    }

    .vertical_center {
        display: flex;
        align-items: center;
        height: 100%;
    }

    .block {
        width: 100%;
    }
</style>


<div class="container">
    <div class="image"></div>
    <main>
        <div class="vertical_center">
            <div class="block">
                <slot />
            </div>
        </div>
    </main>
</div>