<style lang="scss">
    .container {
        display: flex;
    }
    .image {
        width: 50%;
        height: 100vh;
        background-image: url(https://picsum.photos/960/1080);
        background-size: cover;
        background-position: center;
        filter: brightness(.7);
    }

    main {
        width: 50%;
        height: 100vh;
        background-color: $background;
        color: $text;
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