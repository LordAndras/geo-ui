import {defineStore} from "pinia";
import {Ref, ref} from "vue";

export const useGeoCsvStore = defineStore('geoCsvStore', () => {
    const fileName: Ref<string | null> = ref(null)
    const content = ref('')
    const isValid = ref(true)

    return {fileName, content, isValid}
})
