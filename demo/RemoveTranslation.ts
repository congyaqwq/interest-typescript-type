// copy to https://www.typescriptlang.org/play

type NonNullable<T> = Exclude<T, null>; 

export type RemoveTranslation<T extends Record<string, unknown> | unknown[]> = NonNullable<T> extends unknown[]
  ? RemoveTranslation<(T & Record<string, unknown>[])[number]>[]
  : {
      [Key in keyof T]: NonNullable<T[Key]> extends Record<string, string>
        ? string
        : NonNullable<T[Key]> extends Record<string, unknown>[]
        ? RemoveTranslation<(T[Key] & Record<string, unknown>[])[number]>[]
        : NonNullable<T[Key]> extends Record<string, unknown>
        ? RemoveTranslation<T[Key]&Record<string, unknown>>
        : T[Key];
    };


type TT = { name: Record<string, string>; value: string }
type TTT = { name: Record<string, string>; value: string, car: { name: Record<string, string> } }
type TTTT = { name: Record<string, string>; value: string, car: { name: Record<string, string> }[] }
type TTTTT = { car: { name: Record<string, string> }[] }

type A = RemoveTranslation<TT>
type B = RemoveTranslation<TTT>
type C = RemoveTranslation<TTTT>
type D = RemoveTranslation<TTTTT>

const a: C
a.car[0].name


export type PageRespApi<TItem> = {
  total: number;
  data: Array<TItem> | null;
}

type RelatedChild = {
  id: string;
  name: Record<string, string> | null
}

type ProductInner = {
  name: Record<string, string>;
  related: RelatedChild | null
}


export type Product = {
  id: string;
  productName: Record<string, string>;
  functionalUnit: string | null;
  info: ProductInner | null
}

const data: PageRespApi<Product> = { data: [], total: 0 }
const data2: PageRespApi<Product> = { data: [], total: 0 }

function translateDataByLang<T extends Record<string, any>| (Record<string, any>)[] | null>(
  data: T,
  lang: string
): RemoveTranslation<T & Record<string, any>> | null {
  return {} as any
}

const res = translateDataByLang(data, 'en')
const res2 = translateDataByLang({ data: [] as Product[], total: 0 }, 'en')
const res3 = translateDataByLang([] as Product[], 'en')


res.data[0].info
res2.data[0].productName
res3[0].productName

