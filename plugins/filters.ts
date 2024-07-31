export default defineNuxtPlugin((NuxtApp) => {
    return {
        provide: {
            filters: {
                currency(value: any) {
                    if (typeof value !== 'number' || isNaN(value)) {
                        return '';
                    }
                    return `$${value.toFixed(2)}`;
                }
            }
        }
    }
})