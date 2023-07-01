import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primevue/resources/themes/luna-blue/theme.css";

import "./assets/main.css";

const app = createApp(App);
app.use(PrimeVue);
createApp(App).mount("#app");
