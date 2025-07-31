import { reactive, ref, shallowRef } from "vue";

const songStore = reactive({
    title: "",
    trackerName: "",
});

export { songStore };
