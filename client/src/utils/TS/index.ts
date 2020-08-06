// Returns value type of a generic - invert of the keyof access type
export type ValueOf<T> = T[keyof T];