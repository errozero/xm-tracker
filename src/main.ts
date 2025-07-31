import { createApp } from "vue";
import "./style.css";
import App from "@ui/App.vue";
import main from "@app/main";

main.init({});

createApp(App).mount("#app");
