<template>

  <div class="flex min-h-screen w-full flex-col bg-muted/40">
    <aside class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav class="flex flex-col items-center gap-4 px-2 py-4">
        <a href="#"
          class="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
          <Package2 class="h-4 w-4 transition-all group-hover:scale-110" />
          <span class="sr-only">Acme Inc</span>
        </a>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <a href="#"
                class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                <Home class="h-5 w-5" />
                <span class="sr-only">Dashboard</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">
              Dashboard
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <a href="#"
                class="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8">
                <ShoppingCart class="h-5 w-5" />
                <span class="sr-only">Orders</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">
              Orders
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <a href="#"
                class="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                <Package class="h-5 w-5" />
                <span class="sr-only">Products</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">
              Products
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <a href="#"
                class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                <Users2 class="h-5 w-5" />
                <span class="sr-only">Customers</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">
              Customers
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <a href="#"
                class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                <LineChart class="h-5 w-5" />
                <span class="sr-only">Analytics</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">
              Analytics
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav class="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <a href="#"
                class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                <Settings class="h-5 w-5" />
                <span class="sr-only">Settings</span>
              </a>
            </TooltipTrigger>
            <TooltipContent side="right">
              Settings
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
    <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <header
        class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <div>
          <Sheet>
            <SheetTrigger as-child>
              <Button size="icon" variant="outline" class="sm:hidden">
                <PanelLeft class="h-5 w-5" />
                <span class="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" class="sm:max-w-xs">
              <nav class="grid gap-6 text-lg font-medium">
                <a href="#"
                  class="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
                  <Package2 class="h-5 w-5 transition-all group-hover:scale-110" />
                  <span class="sr-only">Acme Inc</span>
                </a>
                <a href="#" class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                  <Home class="h-5 w-5" />
                  Dashboard
                </a>
                <a href="#" class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                  <ShoppingCart class="h-5 w-5" />
                  Orders
                </a>
                <a href="#" class="flex items-center gap-4 px-2.5 text-foreground">
                  <Package class="h-5 w-5" />
                  Products
                </a>
                <a href="#" class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                  <Users2 class="h-5 w-5" />
                  Customers
                </a>
                <a href="#" class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                  <LineChart class="h-5 w-5" />
                  Settings
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <div class="relative ml-auto flex-1 md:grow-0">
          <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..."
            class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="secondary" size="icon" class="rounded-full">
              <!-- <CircleUser class="h-5 w-5" /> -->
              <img src="../public/image/02.png" alt="User Avatar" class="h-8 w-8 rounded-full object-cover" />
              <span class="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem><nuxt-link @click="logoutUser">Logout</nuxt-link></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
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
                    <TableRow v-for="product in products.data" :key="product.id">
                      <TableCell class="hidden sm:table-cell">
                        <img alt="Product image" class="aspect-square rounded-md object-cover" height="64"
                          src="./placeholder.svg" width="64">
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
                            <DropdownMenuItem @click="editProduct(product.id)">Edit</DropdownMenuItem>
                            <DropdownMenuItem @click="deleteProduct(product.id)">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div class="text-xs text-muted-foreground">
                  Showing <strong>1-10</strong> of <strong>32</strong>
                  products
                </div>
              </CardFooter>
              <Toaster /> 
              <div class="flex justify-center mb-4">
                <Pagination v-slot="{ page }" :total="totalPages" :sibling-count="1" show-edges
                  :default-page="currentPage">
                  <PaginationList v-slot="{ items }" class="flex items-center gap-1">
                    <PaginationFirst @click="fetchProducts(1, perPage)"/>
                    <PaginationPrev @click="fetchProducts(currentPage - 1, perPage)"/>
                    <template v-for="(item, index) in items">
                      <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                        <Button class="w-10 h-10 p-0" :variant="item.value === currentPage ? 'default' : 'outline'"
                          @click="fetchProducts(item.value, perPage)">
                          {{ item.value }}
                        </Button>
                      </PaginationListItem >
                      <PaginationEllipsis v-else :key="item.type" :index="index" />
                    </template>
                    <PaginationNext @click="fetchProducts(currentPage + 1, perPage)"/>
                    <PaginationLast @click="fetchProducts(lastPage, perPage)"/>
                  </PaginationList>
                </Pagination>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
        <ProductModal v-if="isModalOpen" @close="isModalOpen = false" @save="handleSave">
        </ProductModal>
      </main>
    </div>
  </div>
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
import { useAuthStore } from '~/stores/auth';
import ProductModal from '@/components/common/popups/ProductModal.vue'; // Adjust the import path based on your project structure

const productStore = useProductstore();
const userStore = useUserStore();
const router = useRouter();
const { logout } = useAuthStore();
const isModalOpen = ref(false);
const isEditing = ref(false);
const form = reactive({ id: null, title: "", content: "" });
const roles = computed(() => userStore.roles);
const permissions = computed(() => userStore.permissions);
const products = ref<any>([]);
const totalPages = ref<number>(1);
const currentPage = ref<number>(1);
const lastPage = ref<number>(1);
const perPage = ref<number>(10);
const { toast } = useToast();

const fetchProducts = async (page: number, perPage: number) => {
  try {
    await productStore.fetchProducts(page, perPage);
    products.value = productStore.products;
    totalPages.value = productStore.products.total;
    lastPage.value = productStore.products.last_page;
    currentPage.value = page;
  } catch (error) {
    console.error('Error fetching products', error);
  }
};
onMounted(async () => {
  fetchProducts(currentPage.value, perPage.value);
});

const handleSave = (product: { name: string, description: string, status: string,  price: number, quantity: string }) => {
  productStore.addProduct(product);
  isModalOpen.value = false;
  toast({
    title: 'Product Added',
    description: `Product ${product.name} has been added successfully.`,
    variant: 'default', 
    duration: 2000,     
  });
};

const logoutUser = () => {
  logout();
  router.push('/login');
};

// const submitForm = async () => {
//   if (isEditing.value) {
//     await productStore.updateProduct(form);
//   } else {
//     await productStore.addProduct({ title: form.title, content: form.content });
//   }
//   resetForm();
// };

// const resetForm = () => {
//   form.id = null;
//   form.title = "";
//   form.content = "";
//   isEditing.value = false;
// };

const editProduct = (product: { id: number, title: string, content: string }) => {
  // form.id = product.id;
  // form.title = product.title;
  // form.content = product.content;
  // isEditing.value = true;
};

const deleteProduct = async (productId: number) => {
  // await productStore.deleteProduct(productId);
};

</script>