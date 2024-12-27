<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="w-full mx-[200px] rounded-lg bg-white p-6 shadow-lg">
            <!-- Header -->
            <div class="mb-4 flex items-center justify-between border-b pb-2">
                <h2 class="text-xl font-semibold">Add Product</h2>
                <button class="text-gray-500 hover:text-gray-700" @click="$emit('close')">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Body -->
            <form @submit.prevent="saveProduct">
                <Card class="border-0">
                    <CardHeader>
                    </CardHeader>
                    <CardContent>
                        <div class="grid gap-6">
                            <div class="grid gap-3">
                                <Label for="name">Name</Label>
                                <Input id="name" v-model="form.name" type="text" class="w-full" default-value="Gamer Gear Pro Controller" />
                            </div>
                            <div class="grid gap-3">
                                <Label for="description">Description</Label>
                                <Textarea id="description" v-model="form.description"
                                    default-value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                                    class="min-h-32" />
                            </div>
                            <div class="grid gap-3">
                                <Label for="status">Status</Label>
                                <Select v-model="form.status">
                                    <SelectTrigger id="status" aria-label="Select status">
                                    <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    <SelectItem value="Draft">
                                        Draft
                                    </SelectItem>
                                    <SelectItem value="Published">
                                        Active
                                    </SelectItem>
                                    <SelectItem value="Archived">
                                        Archived
                                    </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div class="grid gap-3">
                                <Label for="price">Price</Label>
                                <Input id="price" v-model="form.price" type="text" class="w-full"  />
                            </div>
                            <div class="grid gap-3">
                                <Label for="quantity">Quantity</Label>
                                <Input id="quantity" v-model="form.quantity" type="text" class="w-full" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <!-- Footer -->
                <div class="mt-6 flex items-center justify-end gap-4">
                    <Button variant="outline" size="sm" @click="$emit('close')">
                        Cancel
                    </Button>
                    <Button size="sm" type="submit">
                        Save
                    </Button>
                </div>

            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  initialForm: {
    type: Object,
    default: () => ({
      name: '',
      description: '',
      status: '',
      price: null,
      quantity: 1, 
    }), 
  },
});

const emit = defineEmits(['close', 'save']);

const form = ref({ ...props.initialForm });

const saveProduct = () => {
  emit('save', form.value);
  form.value = { name: '',description: '', status: '', price: null, quantity: 1 }; // Reset form with quantity
};
</script>

<style scoped>
button {
    transition: background-color 0.2s;
}
</style>