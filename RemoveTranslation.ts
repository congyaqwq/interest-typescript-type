// covert {name: {en: '', zh: ''}} -> {name: ''}
// see demo in '/demo/RemoveTranslation.ts'

type NonNullable<T> = Exclude<T, null>;

export type RemoveTranslation<T extends Record<string, unknown> | unknown[]> =
  NonNullable<T> extends unknown[]
    ? RemoveTranslation<(T & Record<string, unknown>[])[number]>[]
    : {
        [Key in keyof T]: NonNullable<T[Key]> extends Record<string, string>
          ? string
          : NonNullable<T[Key]> extends Record<string, unknown>[]
          ? RemoveTranslation<(T[Key] & Record<string, unknown>[])[number]>[]
          : NonNullable<T[Key]> extends Record<string, unknown>
          ? RemoveTranslation<T[Key] & Record<string, unknown>>
          : T[Key];
      } & { _raw: T };