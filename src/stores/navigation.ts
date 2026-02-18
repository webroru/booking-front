import { defineStore } from 'pinia'
import { reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n';
import { useBookingStore } from '@/stores/booking'

export const useNavigationStore = defineStore('navigation', () => {
    const bookingStore = useBookingStore()
    const { t } = useI18n();

    const button = reactive({
        label: t('common.next'),
        disabled: true,
        variant: 'primary',
        to: '/',
    })

    const steps = [
        'search',
        'instruction',
        'rules',
        'documents',
        'payment',
        'booking-info',
    ]

    const getCurrentStepIndex = (path: string) =>
        steps.findIndex(step => path.includes(step))

    const isLastStep = (path: string) =>
        getCurrentStepIndex(path) >= steps.length - 1

    const getDebt = () =>
        Math.max(bookingStore.bookings.reduce((d, b) => d + (b.debt ?? 0), 0), 0)

    const getNextRoute = (path: string): string => {
        const { booking, bookings } = bookingStore
        let stepIndex = getCurrentStepIndex(path)

        if (bookings.every(b => b.checkIn) && stepIndex === 0) {
            return `/confirmation/${booking?.orderId}/booking-info`
        }

        stepIndex++

        if (steps[stepIndex] === 'payment' && getDebt() === 0) {
            stepIndex++
        }

        if (stepIndex < 0) return '/'

        return stepIndex === 0
            ? '/confirmation/search'
            : `/confirmation/${booking?.orderId}/${steps[stepIndex]}`
    }

    const setNextButton = (options: Partial<typeof button>) => {
        Object.assign(button, options)
    }

    const resetButton = () => {
        button.label = 'Next'
        button.disabled = false
        button.variant = 'primary'
        button.to = '/'
    }

    return {
        button,
        steps,
        isLastStep,
        getNextRoute,
        setNextButton,
        resetButton,
    }
})
