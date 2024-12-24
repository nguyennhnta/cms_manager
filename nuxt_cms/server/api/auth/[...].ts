
import { NuxtAuthHandler } from '#auth'
const { passport } = useRuntimeConfig() // get the values from the runtimeConfig
import CredentialsProvider from 'next-auth/providers/credentials'
export default NuxtAuthHandler({
    secret: process.env.AUTH_NO_SECRET, //replace that with env variables // runtime config
    // providers: [
    //     {
    //       id: 'laravelpassport', // ID is only used for the callback URL
    //       name: 'Passport', // name is used for the login button
    //       type: 'oauth', // connexion type
    //       version: '2.0', // oauth version
    //       authorization: {
    //         url: `${passport.baseUrl}/oauth/authorize`, // this is the route created by passport by default to get the autorization code
    //         params: {
    //           scope: '*', // this is the wildcard for all scopes in laravel passport, you can specify scopes separated by a space
    //         }
    //       },
    //       token: {
    //         url: `${passport.baseUrl}/oauth/token`, // this is the default route created by passport to get and renew the tokens
    //       },
    //       clientId: passport.clientId, // the client Id
    //       clientSecret: passport.clientSecret, // the client secret
    //       userinfo: {
    //         url: `${passport.baseUrl}/api/v1/me`, // this is a custom route that must return the current user that must be created in laravel
    //       },
    //       profile: (profile) => {
    //         // map the session fields with you laravel fields
    //         // profile is the user coming from the laravel app
    //         // update the return with your own fields names
    //         return {
    //           id: profile.id,
    //           name: profile.username,
    //           email: profile.email,
    //           image: profile.image,
    //         }
    //       },
    //       idToken: false,
    //     }
    //   ],

    providers: [
      {
        id: 'laravelpassport',
        name: 'Passport',
        type: 'credentials', // Sử dụng 'credentials' thay vì 'oauth'
        credentials: {
          email: { label: 'Email', type: 'text' },
          password: { label: 'Password', type: 'password' },
        },
        authorize: async (credentials : any) => {
          try {
            const response = await fetch(`${process.env.LARAVEL_API_URL}/login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            });
  
            const data = await response.json();
  
            if (response.ok && data.token) {
              return {
                id: data.user.id, // Thông tin người dùng từ Laravel
                email: data.user.email,
                name: data.user.name,
                access_token: data.token, // Lưu access token
              };
            }
            throw new Error('Unauthorized');
          } catch (error) {
            return null;
          }
        },

        clientId: process.env.PASSPORT_CLIENT_ID, // the client Id
        clientSecret: process.env.PASSPORT_CLIENT_SECRET, // the client secret
        profile: (profile) => {
          // map the session fields with you laravel fields
          // profile is the user coming from the laravel app
          // update the return with your own fields names
          return {
            id: profile.id,
            name: profile.username,
            email: profile.email,
          }
        },
        idToken: false,
      },
    ],
})