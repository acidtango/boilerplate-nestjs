// You can use this file to add custom matchers for jest

// expect.extend({
//   toHavePayload(jwt: string | undefined, expectedPayload: Record<string, any>) {
//     if (!jwt) {
//       return {
//         message: () => `received JWT is undefined.`,
//         pass: false,
//       }
//     }

//     const decoded = getPayload(jwt)

//     if (!decoded) {
//       return {
//         message: () => `received JWT is malformed.`,
//         pass: false,
//       }
//     }
//     const { iat, exp, ...rest } = decoded

//     expect(rest).toEqual(expectedPayload)

//     expect(typeof exp).toEqual('number')
//     expect(typeof iat).toEqual('number')

//     return {
//       message: () => `payloads are equal.`,
//       pass: true,
//     }
//   },
// })
