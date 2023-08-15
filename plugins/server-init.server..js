//  import { useStore } from '~/store/'

export default defineNuxtPlugin(async ({ $pinia, $device }) => { 
    const store = useStore($pinia)
    // await store.nuxtServerInit($device)
});
