import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { PrimeVue } from '@primevue/core'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import Material from '@primeuix/themes/material'
import { Form, FormField } from '@primevue/forms'
import { createPinia } from 'pinia'
import {
    Button, Card, Checkbox, Column, ConfirmationService, ConfirmDialog, DataTable,
    Dialog, DialogService, Drawer, Message, FileUpload, FloatLabel, IconField,
    InputIcon, InputNumber, InputText, Menu, PanelMenu, Rating, Row,
    Select, SelectButton, Tag, Textarea, Toast, ToastService, Toolbar,
    DatePicker, TabView, TabPanel, Dropdown, Password
} from "primevue"
import router from "./router"
import Chart from "primevue/chart"

import { createI18n } from 'vue-i18n'
import es from './locales/es.json'
import en from './locales/en.json'

const defaultLocale = localStorage.getItem('language') || 'es'

const i18n = createI18n({
    legacy: false,
    locale: defaultLocale,
    fallbackLocale: 'en',
    messages: {
        es,
        en
    }
})

const pinia = createPinia()

createApp(App)
    .use(router)
    .use(pinia)
    .use(i18n)
    .use(PrimeVue, { theme: { preset: Material }, ripple: true })
    .use(ConfirmationService)
    .use(DialogService)
    .use(ToastService)
    .component('pv-password', Password)
    .component('pv-chart', Chart)
    .component('pv-datatable', DataTable)
    .component('pv-tabview', TabView)
    .component('pv-dropdown', Dropdown)
    .component('pv-tabpanel', TabPanel)
    .component('pv-datepicker', DatePicker)
    .component('Datepicker', DatePicker)
    .component('pv-select', Select)
    .component('Select', Select)
    .component('pv-message', Message)
    .component('pv-panel-menu', PanelMenu)
    .component('pv-button', Button)
    .component('Button', Button)
    .component('pv-card', Card)
    .component('pv-column', Column)
    .component('pv-confirm-dialog', ConfirmDialog)
    .component('pv-checkbox', Checkbox)
    .component('pv-data-table', DataTable)
    .component('pv-dialog', Dialog)
    .component('pv-select-button', SelectButton)
    .component('pv-file-upload', FileUpload)
    .component('pv-float-label', FloatLabel)
    .component('pv-icon-field', IconField)
    .component('pv-input-icon', InputIcon)
    .component('pv-input-text', InputText)
    .component('pv-input-number', InputNumber)
    .component('pv-menu', Menu)
    .component('pv-rating', Rating)
    .component('pv-row', Row)
    .component('pv-drawer', Drawer)
    .component('pv-tag', Tag)
    .component('pv-textarea', Textarea)
    .component('pv-toolbar', Toolbar)
    .component('pv-toast', Toast)
    .component('pv-form', Form)
    .component('pv-dropdown-group', Dropdown)
    .component('Message', Message)
    .component('FormField', FormField)
    .component('Form', Form)
    .mount('#app')
