import { supabase } from 'lib/supabase-client'

export async function getCities(key, country) {
  let { data: cities } = await supabase
    .from('cities')
    .select('*')
    .eq('country', country)

  return { cities }
}

export async function getCitiesPaths() {
  const { data: cities, error } = await supabase
    .from('cities')
    .select('city_name')

  if (error) {
    throw new Error(`Error: ${error.message}`)
  }

  return cities
}
