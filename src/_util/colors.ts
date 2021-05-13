type ElementOf<T> = T extends (infer E)[] ? E : T extends readonly (infer F)[] ? F : never;

export const PresetStatusColorTypes = ['success', 'processing', 'error', 'default', 'warning'] as const
export const PresetColorTypes = ['pink', 'red', 'yellow', 'orange', 'cyan', 'green', 'blue', 'purple', 'geekblue', 'magenta', 'volcano', 'gold', 'lime'] as const

export type PresetColorType = ElementOf<typeof PresetColorTypes>;
export type PresetStatusColorType = ElementOf<typeof PresetStatusColorTypes>;
