import i18next from 'i18next'
import translations_es from './translations/es/translation.json'
import translations_cat from './translations/cat/translation.json'

i18next
    .init({
        interpolation: {
            escapeValue: false // no need for react. it escapes by default
        },
        lng: localStorage.getItem("lang") || "cat",
        resources:{
            es:{
                translation:translations_es
            },
            cat:{
                translation:translations_cat
            }
        }
    })

export default i18next