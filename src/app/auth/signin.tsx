import type {
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
  } from "next"
  import { getProviders, signIn } from "next-auth/react"
  import { getServerSession } from "next-auth/next"
  import { authOptions } from "../../auth/[...nextauth]"
  
  export default function SignIn({
    providers,
  }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
      <>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </>
    )
  }