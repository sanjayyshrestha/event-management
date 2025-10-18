import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { prisma } from "./lib/prisma"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google,
    Credentials({
      name:'Credentials',
      credentials:{
        email:{label:'email',type:'email'},
        password:{label:'password',type:'password'},
      },
      
      authorize:async(credentials)=>{
        const email=credentials.email as string
        const password=credentials.password as string

        if(!email || !password){
          throw new Error("Enter both email and password")
        }

       const user= await prisma.user.findUnique({
          where:{
            email
          }
        })

        if(!user) throw new Error('Invalid email or password')

          const userData={
            id:user.id,
            name:user.name,
            email:user.email,
            role:user.role,
            image:user.image
          }

          return userData;

      }
    })
  ],

  pages:{
    signIn:'/login'
  },
  session:{
    strategy:'jwt'
  },
  callbacks:{
    async session({session,token}){
      if(token.sub && token.role){
        session.user.id=token.sub
        session.user.role=token.role
      }
      return session
    },

    async jwt({token,user}){
      if(user){
        token.role=user.role
      }
      return token
    },

    signIn:async({user,account})=>{

      if(account?.provider==='credentials'){
        return true
      }

      return false
    }
  }
})