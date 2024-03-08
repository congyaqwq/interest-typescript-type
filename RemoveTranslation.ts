// covert {name: {en: '', zh: ''}} -> {name: ''}
// demo and test case
// https://www.typescriptlang.org/play?#code/C4TwDgpgBAcg9gOxgVwDaoIYCNUQDwAqAfFALxQCiAHgMarIAm+BANFAmqkQNxQBQfCFTBwATsCihIUAEoQAtnABuEAqIwIAzpmABLRIShDgEBA02yINMQzybgo3QgDmbZAgDWCOAHcEJAB8ody9fBABtAF0ScngkTmxcQhJjU3Ngz28-KL4oKAB+S0UVNQ1tDD0DAAoCKAAyS2tRW3tHFzdMsKIogEpwjnksCFFonLyALigAb1y8ufCAaQgQKCcoD2W4ADMoAkjJuJR0ROZF5eijKhMzCzkmlocnVyhWp6JZubnC15cPz6gDogjpgcKcliALqkbo0bHZHu0MqE-N1In9PoU5MVVOotDp9Ag8DUzhD6jDmnC2s8Qll-L1+shBsNRqj-nNAfFjqDCMTIVc0rcrLCflTOsi0V8ispsWU8QYCDy6nchfCRUj-O9WRNdjzuH8AL66gRSaAEWrkKbsDDyCCTJXk4VsYU8KBKDD0G0vFVQPV8Y27U1kaaW622wX2lWOlXO13uyYOqA0DCiSYWhBWj12h6UyOUkh672+8Am01moNpkNkrNPHNvXgx5Ae+OJ5Nl9Oh+4U6ue3PeqIFv0lgPmhNJlPBjNhqsIp29yIFwvSACCgcxUtKuIq+MIxAX0AAQiuFGuceVKgSS+8-QBhQ9Y9enreDy9FqAAEVvx5lm7lT4E1i0EgYJMV58BgAB0zbhAADJEYHlhAAiCMIYgSH6AAKGDOBAciaGAi5gLohAAJImPIMTTLMwBwMAbqTAMQyiLqeQMBUQFQIuojqCAxGkYE7CcLqPq7pYOgQAwFC4NaCASOasy6AwcYqkx47tsq2bdm8UBBBw6B8EJ6GiHADDIDQwAAGIYKZYiBjMeTwap4bqU6ymiBAoniZJpjAKG7kSQoXlafxulCUhIjiJIL5oYZxmmTZckKRpLjKWA0UmcAMBtpWnbTlGylbO4pn4m6ACqCC6N5iXOIFOmoC5EBbMMpg0BAZmoL4imUtVAmzLhVi6FsuiJmeHVPF16DJZgzUAPJbFNjjOE4I0uGNtWzGAk0QDNc26AtCBEQlwrKUwmg0I4YDDZVK3KQAjsgGh6AAXt+CAAGpug2S3OMpbn+dJ+2fVdsw-VJ6WZcKgN5EmNAABa6K6oKTFgcBwLgGjKU4WxwJMUVGWlFlWaIK16X+iD2FALE0djmHYRAuH4YROMxcA5EWhTbFRGwVE0agkxQQW-5k2zABMVNYTheEEXgjNpSz5OsZMHOSNRtFQHzQn5QghWIJIJ6ia+rF7iAAAyGjOIYULpJm2XPBoIBEEEVRW-GttEH0c7aZwRBVLMbOTKwsyYC4n18D0oZ3rrz2GA0TsRlALt8TVFF5K5wDIKICDTPmGAWLbxN8ALEiuRY5AOF+Jj6zRhsmy4VRs2wADkpj1z0+ek4XtNC4GpcbuXBvG6bVSs-LUB9tnUDS6ZitcyrasN03LcF1ARcAMxdxHveV-3NejxYE-AIrjcIM3iFF2BbPQbBGNwHwRdC2frEX2BKW46ZGXWjftPL4-z9M2-CF8EAA

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