import { supabase } from 'lib/supabase-client'
import { useEffect, useState, createContext, useContext } from 'react'

export const UserContext = createContext(null)

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState()

  useEffect(() => {
    const session = supabase.auth.session()
    setUser(session?.user ?? null)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      authListener.unsubscribe()
    }
  }, [])

  // const getUserDetails = () => supabase.from('users').select('*').single()
  // const getSubscription = () =>
  //   supabase
  //     .from('subscriptions')
  //     .select('*, prices(*, products(*))')
  //     .in('status', ['trialing', 'active'])
  //     .single()

  useEffect(() => {
    const setUserFetch = async (user) => {
      const getUserDetails = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (!getUserDetails.data) {
        console.log(user, 'el usuario a insertar')
        const { data, error } = await supabase.from('users').insert({
          full_name: user.user_metadata.full_name,
          email: user.email,
          photo_url: user.user_metadata.avatar_url,
          created_at: new Date(),
          id: user.id,
        })
        console.log(data, 'user data inserted')
        setUserData(data[0] || null)
      } else {
        setUserData(getUserDetails.data)
      }

      console.log(getUserDetails, 'detalles del usuario')
    }

    if (user) {
      // Promise.allSettled([getUserDetails(), getSubscription()]).then(
      //   (results: any) => {
      //     setUserDetails(results[0].value.data)
      //     setSubscription(results[1].value.data)
      //     setUserLoaded(true)
      //   }
      // )
      console.log(user, 'existe un usuario')
      setUserFetch(user)
    }
  }, [user])

  const value = {
    user: userData,
    signIn: (options) => supabase.auth.signIn(options),
    signUp: (options) => supabase.auth.signUp(options),
    signOut: () => {
      console.log('cerrando sesión')
      setUserData(null)
      return supabase.auth.signOut()
    },
  }
  return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`)
  }
  return context
}
