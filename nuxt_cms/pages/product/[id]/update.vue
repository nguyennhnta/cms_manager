<template>
  <div class="flex min-h-screen w-full flex-col bg-muted/40">
      <header class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 mb-4">
        <Breadcrumb class="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink as-child>
                <a href="#">Dashboard</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink as-child>
                <a href="#">Products</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Edit Product</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <form  @submit.prevent="updateProduct">
        <!-- <form v-if="productStore.product" @submit.prevent="saveProduct"> -->
        <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div class="mx-auto grid flex-1 auto-rows-max gap-4">
            <div class="flex items-center gap-4">
              <Button variant="outline" size="icon" class="h-7 w-7" type="button" @click="goBack">
                <ChevronLeft class="h-4 w-4" />
                <span class="sr-only">Back</span>
              </Button>
              <h1 class="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Pro Controller
              </h1>
              <Badge variant="outline" class="ml-auto sm:ml-0">
                In stock
              </Badge>
              <div class="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm" type="button">
                  Discard
                </Button>
                <Button size="sm" type="submit">
                  Save Product
                </Button>
              </div>
            </div>
            <div class="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div class="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div class="grid gap-6">
                      <div class="grid gap-3">
                        <Label for="name">Name</Label>
                        <Input
                          id="name"
                          type="text"
                          class="w-full"
                          default-value="Gamer Gear Pro Controller"
                          v-model="productStore.product.name" 
                          required
                        />
                      </div>
                      <div class="grid gap-3">
                        <Label for="description">Description</Label>
                        <Textarea
                          id="description"
                          v-model="productStore.product.description" 
                          default-value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                          class="min-h-32"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Stock</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead class="w-[100px]">
                            SKU
                          </TableHead>
                          <TableHead>Stock</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead class="w-[100px]">
                            Size
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell class="font-semibold">
                            GGPC-001
                          </TableCell>
                          <TableCell>
                            <Label for="stock-1" class="sr-only">
                              Stock
                            </Label>
                            <Input
                              id="stock-1"
                              type="number"
                              default-value="100"
                            />
                          </TableCell>
                          <TableCell>
                            <Label for="price-1" class="sr-only">
                              Price
                            </Label>
                            <Input
                              id="price-1"
                              type="number"
                              default-value="99"
                            />
                          </TableCell>
                          <TableCell>
                            <ToggleGroup
                              type="single"
                              default-value="s"
                              variant="outline"
                            >
                              <ToggleGroupItem value="s">
                                S
                              </ToggleGroupItem>
                              <ToggleGroupItem value="m">
                                M
                              </ToggleGroupItem>
                              <ToggleGroupItem value="l">
                                L
                              </ToggleGroupItem>
                            </ToggleGroup>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell class="font-semibold">
                            GGPC-002
                          </TableCell>
                          <TableCell>
                            <Label for="stock-2" class="sr-only">
                              Stock
                            </Label>
                            <Input
                              id="stock-2"
                              type="number"
                              default-value="143"
                            />
                          </TableCell>
                          <TableCell>
                            <Label for="price-2" class="sr-only">
                              Price
                            </Label>
                            <Input
                              id="price-2"
                              type="number"
                              default-value="100"
                            />
                          </TableCell>
                          <TableCell>
                            <ToggleGroup
                              type="single"
                              default-value="m"
                              variant="outline"
                            >
                              <ToggleGroupItem value="s">
                                S
                              </ToggleGroupItem>
                              <ToggleGroupItem value="m">
                                M
                              </ToggleGroupItem>
                              <ToggleGroupItem value="l">
                                L
                              </ToggleGroupItem>
                            </ToggleGroup>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell class="font-semibold">
                            GGPC-003
                          </TableCell>
                          <TableCell>
                            <Label for="stock-3" class="sr-only">
                              Stock
                            </Label>
                            <Input
                              id="stock-3"
                              type="number"
                              default-value="32"
                            />
                          </TableCell>
                          <TableCell>
                            <Label for="price-3" class="sr-only">
                              Stock
                            </Label>
                            <Input
                              id="price-3"
                              type="number"
                              default-value="99"
                            />
                          </TableCell>
                          <TableCell>
                            <ToggleGroup
                              type="single"
                              default-value="s"
                              variant="outline"
                            >
                              <ToggleGroupItem value="s">
                                S
                              </ToggleGroupItem>
                              <ToggleGroupItem value="m">
                                M
                              </ToggleGroupItem>
                              <ToggleGroupItem value="l">
                                L
                              </ToggleGroupItem>
                            </ToggleGroup>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter class="justify-center border-t p-4">
                    <Button size="sm" variant="ghost" class="gap-1" type="button">
                      <PlusCircle class="h-3.5 w-3.5" />
                      Add Variant
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Product Category</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div class="grid gap-6 sm:grid-cols-3">
                      <div class="grid gap-3">
                        <Label for="category">Category</Label>
                        <Select>
                          <SelectTrigger
                            id="category"
                            aria-label="Select category"
                          >
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="clothing">
                              Clothing
                            </SelectItem>
                            <SelectItem value="electronics">
                              Electronics
                            </SelectItem>
                            <SelectItem value="accessories">
                              Accessories
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div class="grid gap-3">
                        <Label for="subcategory">
                          Subcategory (optional)
                        </Label>
                        <Select>
                          <SelectTrigger
                            id="subcategory"
                            aria-label="Select subcategory"
                          >
                            <SelectValue placeholder="Select subcategory" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="t-shirts">
                              T-Shirts
                            </SelectItem>
                            <SelectItem value="hoodies">
                              Hoodies
                            </SelectItem>
                            <SelectItem value="sweatshirts">
                              Sweatshirts
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div class="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div class="grid gap-6">
                      <div class="grid gap-3">
                        <Label for="status">Status</Label>
                        <Select v-model="productStore.product.status">
                          <SelectTrigger id="status" aria-label="Select status">
                            <SelectValue :placeholder="productStore.product.status || 'Select status'" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Draft">Draft</SelectItem>
                            <SelectItem value="Published">Active</SelectItem>
                            <SelectItem value="Archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card class="overflow-hidden">
                  <CardHeader>
                    <CardTitle>Product imgs</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div class="grid gap-2">
                      <img
                        alt="Product image"
                        class="aspect-square w-full rounded-md object-cover"
                        height="300"
                        src="/placeholder.svg"
                        width="300"
                      >
                      <div class="grid grid-cols-3 gap-2">
                        <button>
                          <img
                            alt="Product image"
                            class="aspect-square w-full rounded-md object-cover"
                            height="84"
                            src="/placeholder.svg"
                            width="84"
                          >
                        </button>
                        <button>
                          <img
                            alt="Product image"
                            class="aspect-square w-full rounded-md object-cover"
                            height="84"
                            src="/placeholder.svg"
                            width="84"
                          >
                        </button>
                        <button class="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                          <Upload class="h-4 w-4 text-muted-foreground" />
                          <span class="sr-only">Upload</span>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Archive Product</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div />
                    <Button size="sm" variant="secondary" type="button">
                      Archive Product
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div class="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm" type="button">
                Discard
              </Button>
              <Button size="sm" type="submit">
                <!-- <Button size="sm" type="submit"  :disabled="productStore.loading"> -->
                Save Product
              </Button>
            </div>
          </div>
        </main>
      </form>
      <Toaster />
      <!-- Hiển thị trạng thái tải dữ liệu -->
      <!-- <div v-else-if="productStore.loading">Loading product...</div> -->

      <!-- Hiển thị lỗi nếu có -->
      <!-- <div v-if="productStore.error">{{ productStore.error }}</div> -->
  </div>
</template>
<script setup lang="ts">
import { Badge } from '@/components/ui/badge'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  ChevronLeft,
  CircleUser,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Upload,
  Users2,
} from 'lucide-vue-next'
import { useToast } from '@/components/ui/toast/use-toast'


import { useProductstore } from "~/stores/products";
import { useUserStore } from "~/stores/user";
import { useAuthStore } from '~/stores/auth';
import * as product from '~/models/products/types';

const route = useRoute();
const router = useRouter();
const productStore = useProductstore();
const { toast } = useToast();

const productId = Number(route.params.id)

onMounted(() => {
  productStore.showProduct(productId)
})

const updateProduct = async () => {
  const updatedProduct = productStore.product
  const response = await productStore.updateProduct(productId, updatedProduct)
  console.log(response);
  if (response && response.status === 200) {
    toast({
      title: 'Product Update',
      description: `Product ${updatedProduct.name} has been added successfully.`,
      variant: 'default',
      duration: 2000,
    });
  }
}
const goBack = () => {
  router.back()
}
</script>