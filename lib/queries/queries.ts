import { createClient } from '@/utils/supabase/server';
import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers';

export async function fetchProducts(
    query: string,
    currentPage:number
) {
    noStore();
    const cookieStore = cookies()
    const supabase = createClient(cookieStore);


    try {
        console.log('Fetcing products data...')
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const { data: { user } } = await supabase.auth.getUser()
        
        const {data: fetchedData} = await supabase
        .from('product')
          .select('*')
          .eq('account_id', user?.id)

        
    } catch(error) {
        console.log(error)
    }
}