"use client"
import { MoreHorizontal } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
import { createClient } from '@/utils/supabase/client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"


export type ProductTable = {
  id: string
  name: string
  price: number
  ingredients: string
}




export const columns: ColumnDef<ProductTable>[] = [
 
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "ingredients",
    header: "Ingredients",
  },
  {
    accessorKey:"actions",
    id: 'actions',
    cell:({row}) => {
        const supabase = createClient()

      const deleteProduct = async (productId:any) => {
        try {
          const { data, error } = await supabase
            .from("product")
            .delete()
            .eq("id", productId);
      
          if (error) {
            throw new Error(error.message);
          }
      
          console.log("Product deleted successfully!");
        } catch (error) {
          console.error("Error deleting product:", error);
        }
      };
      

        return (
            <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger>
                    <MoreHorizontal className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                    <DropdownMenuItem>Open</DropdownMenuItem>
                    <DropdownMenuItem>Download</DropdownMenuItem>
                <DialogTrigger asChild>
                    <DropdownMenuItem >
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. Are you sure you want to permanently
                  delete this file from our servers?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button  onClick={() => deleteProduct(row.original.id)}>Delete Product</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
        )
    }
  }
  
]



