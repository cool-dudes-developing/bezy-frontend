import type { InjectionKey } from 'vue'
import type { SpinnerInject } from '@/types'

export const SpinnerKey: InjectionKey<SpinnerInject> = Symbol('Spinner')
