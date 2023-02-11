<template>
    <div class="border-2 bg-inherit p-2 border-black 
                min-w-full min-h-fit flex flex-col rounded-xl
                bg-opacity-60 bg-orange-100">
        <header class="text-lg font-bold">
            <slot name="header"/>
        </header>
        <main class="text-sm font-semibold flex-1">
            <slot/>
        </main>
    </div>
</template>

<script>
    export default {
        name: "Card"

    }
</script>