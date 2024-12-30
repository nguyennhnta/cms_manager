<template>
  <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
    <Tabs default-value="all">
      <div class="flex items-center">
        <TabsList>
          <TabsTrigger value="all">
            All
          </TabsTrigger>
          <TabsTrigger value="active">
            Active
          </TabsTrigger>
          <TabsTrigger value="draft">
            Draft
          </TabsTrigger>
          <TabsTrigger value="archived" class="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <div class="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="outline" size="sm" class="h-7 gap-1">
                <ListFilter class="h-3.5 w-3.5" />
                <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem checked>
                Active
              </DropdownMenuItem>
              <DropdownMenuItem>Draft</DropdownMenuItem>
              <DropdownMenuItem>
                Archived
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" class="h-7 gap-1">
            <File class="h-3.5 w-3.5" />
            <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Export
            </span>
          </Button>
          <Button size="sm" class="h-7 gap-1" @click="isModalOpen = true">
            <PlusCircle class="h-3.5 w-3.5" />
            <span class="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Product
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>
              Manage your products and view their sales performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead class="hidden w-[100px] sm:table-cell">
                    <span class="sr-only">img</span>
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead class="hidden md:table-cell">
                    Price
                  </TableHead>
                  <TableHead class="hidden md:table-cell">
                    Quantity
                  </TableHead>
                  <TableHead class="hidden md:table-cell">
                    Created at
                  </TableHead>
                  <TableHead>
                    <span class="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="product in products" :key="product.id">
                  <TableCell class="hidden sm:table-cell">
                    <img alt="Product image" class="aspect-square rounded-md object-cover" height="64" src="/iphone.jpg"
                      width="64">
                  </TableCell>
                  <TableCell class="font-medium">
                    {{ product.name }}
                  </TableCell>
                  <TableCell class="font-medium">
                    {{ product.description }}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {{ product.status }}
                    </Badge>
                  </TableCell>
                  <TableCell class="hidden md:table-cell">
                    ${{ product.price || 'N/A' }}
                  </TableCell>
                  <TableCell class="hidden md:table-cell">
                    {{ product.quantity || 'N/A' }}
                  </TableCell>
                  <TableCell class="hidden md:table-cell">
                    {{ product.created_at }}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger as-child>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal class="h-4 w-4" />
                          <span class="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem @click="editProduct(product)">Edit</DropdownMenuItem>
                        <DropdownMenuItem @click="deleteProduct(product)">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <div class="text-xs text-muted-foreground">
              Showing
              <strong>{{ (currentPage - 1) * perPage + 1 }}</strong>-
              <strong>{{ Math.min(currentPage * perPage, totalPages) }}</strong>
              of <strong>{{ totalPages }}</strong> products
            </div>
          </CardFooter>
          <Toaster />
          <div class="flex justify-center mb-4">
            <Pagination v-slot="{ page }" :total="totalPages" :sibling-count="1" show-edges :default-page="currentPage">
              <PaginationList v-slot="{ items }" class="flex items-center gap-1">
                <PaginationFirst @click="fetchProducts(1, perPage)" />
                <PaginationPrev @click="fetchProducts(currentPage - 1, perPage)" />
                <template v-for="(item, index) in items">
                  <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                    <Button class="w-10 h-10 p-0" :variant="item.value === currentPage ? 'default' : 'outline'"
                      @click="fetchProducts(item.value, perPage)">
                      {{ item.value }}
                    </Button>
                  </PaginationListItem>
                  <PaginationEllipsis v-else :key="item.type" :index="index" />
                </template>
                <PaginationNext @click="fetchProducts(currentPage + 1, perPage)" />
                <PaginationLast @click="fetchProducts(lastPage, perPage)" />
              </PaginationList>
            </Pagination>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
    <ProductModal v-if="isModalOpen" @close="isModalOpen = false" @save="handleSave">
    </ProductModal>
  </main>
</template>
<script lang="ts" setup>

import { Badge } from '@/components/ui/badge'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { CircleUser, File, Home, LineChart, ListFilter, MoreHorizontal, Package, Package2, PanelLeft, PlusCircle, Search, Settings, ShoppingCart, Users2 } from 'lucide-vue-next'
import { Pagination, PaginationEllipsis, PaginationFirst, PaginationLast, PaginationList, PaginationListItem, PaginationNext, PaginationPrev } from '@/components/ui/pagination'
import { Toaster } from '@/components/ui/toast'
import { useToast } from '@/components/ui/toast/use-toast'

import { useProductstore } from "~/stores/products";
import { useUserStore } from "~/stores/user";
import ProductModal from '@/components/common/popups/ProductModal.vue'; // Adjust the import path based on your project structure
import * as product from '~/models/products/types';


const productStore = useProductstore();
const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
const isModalOpen = ref(false);
const isEditing = ref(false);
const roles = computed(() => userStore.roles);
const permissions = computed(() => userStore.permissions);
const products = ref<product.Product[]>([]);
const totalPages = ref<number>(1);
const currentPage = ref<number>(1);
const lastPage = ref<number>(1);
const perPage = ref<number>(10);
const { toast } = useToast();

const fetchProducts = async (page: number, perPage: number) => {
  try {
    await productStore.fetchProducts(page, perPage);
    products.value = productStore.products.data;
    totalPages.value = productStore.products.total;
    lastPage.value = productStore.products.last_page;
    currentPage.value = page;
    // update URL with parameter
    router.push({ query: { page: page.toString() } });
  } catch (error) {
    console.error('Error fetching products', error);
  }
};
onMounted(async () => {
  const page = parseInt(route.query.page as string) || 1;
  currentPage.value = page;
  fetchProducts(currentPage.value, perPage.value);
});

const handleSave = async (product: product.Product) => {
  isModalOpen.value = false;

  await productStore.addProduct(product);
  if (productStore.message) {
    toast({
      title: 'Product Added',
      description: `Product ${product.name} has been added successfully.`,
      variant: 'default',
      duration: 2000,
    });
  } else if (productStore.error) {
    toast({
      title: 'Error',
      description: productStore.error,
      variant: 'destructive',
      duration: 2000,
    });
  }
};
const editProduct = (product: product.Product) => {
  router.push({ path: `/product/${product.id}/update` });
}
const deleteProduct = async (product: product.Product) => {
  const confirmed = window.confirm(`Are you sure you want to delete ${product.name}?`);

  if (confirmed) {
    try {
      await productStore.deleteProduct(product);
      if (productStore.message) {
        await fetchProducts(currentPage.value, perPage.value);
        // productStore.products.data = productStore.products.data.filter((p) => p.id !== product.id);
        // products.value = productStore.products.data; // Update list product after deleted

        toast({
          title: 'Product Deleted',
          description: `Product ${product.name} has been deleted successfully.`,
          variant: 'default',
          duration: 2000,
        });
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }
};


</script>