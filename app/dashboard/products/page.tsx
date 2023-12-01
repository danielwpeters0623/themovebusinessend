'use client'
import { Button } from '@/components/ui/button'
import { ProductTable, columns } from '../../../components/products/columns'
import { DataTable } from '../../../components/products/data-table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
// import AddProductForm from '@/components/forms/AddProductForm'
import { createClient } from '@/utils/supabase/client'
import { useState, useEffect } from 'react'
import { Suspense } from 'react';
import { RevenueChartSkeleton } from '@/components/ui/skeleton'
import { AddProductForm } from '@/components/forms/AddProductForm'


export default function Products() {

    const supabase = createClient()
    const [data, setData] = useState<ProductTable[]>([])
  
    useEffect(() => {
      async function fetchProducts() {
        try {
  
          const { data: { user } } = await supabase.auth.getUser()
  
          const { data: fetchedData, error } = await supabase
            .from('product')
            .select('*')
            .eq('account_id', user?.id)
            
          
          if (error) {
            console.error(error);
          } else {
            const castedData = fetchedData as ProductTable[]
            setData(castedData);
          }
        } catch (error) {
          console.error(error);
        }
      }
  
      fetchProducts();
    }, [data, supabase]);
  
  
    return (
    
     <div className='flex-1 space-y-4 p-8 pt-6 bg-purple-100'>
      <div className='flex items-center justify-between space-y-2'>
          <h2 className='text-3xl font-bold tracking-tight'>Products</h2>
  
          <Dialog>
            <DialogTrigger asChild>
            <Button onClick={() => console.log('pressed')}>Add Product</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
              
                
                <AddProductForm />
              
            </DialogContent>
          </Dialog>
  
      </div>
      
      <div>
        <Suspense fallback={<RevenueChartSkeleton />}>
        <DataTable columns={columns} data={data} />

        </Suspense>
      </div>
      </div>     
      
     
        )
  }