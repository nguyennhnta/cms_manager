<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" @click.self="$emit('close')">
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
                <div class="max-h-[70vh] overflow-y-auto p-4">
                <Card class="border-0 shadow-none">
                    <CardContent>
                        <div class="grid gap-3">
                            <div class="grid">
                                <Label for="name" class="mb-3">Name</Label>
                                <Input id="name" v-model="form.name" type="text" class="w-full" :class="{ 'border-red-500': errors.name }" default-value="Gamer Gear Pro Controller" />
                                <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>
                            </div>
                            <div class="grid">
                                <Label for="description" class="mb-3">Description</Label>
                                <Textarea id="description" v-model="form.description"
                                    default-value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                                    class="min-h-32" :class="{ 'border-red-500': errors.description }" />
                                    <span v-if="errors.description" class="text-red-500 text-sm">{{ errors.description }}</span>
                            </div>
                            <div class="grid">
                                <Label for="status" class="mb-3">Status</Label>
                                <Select v-model="form.status">
                                <SelectTrigger
                                    id="status"
                                    aria-label="Select status"
                                    :class="{ 'border-red-500': errors.status }"
                                >
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Draft">Draft</SelectItem>
                                    <SelectItem value="Published">Active</SelectItem>
                                    <SelectItem value="Archived">Archived</SelectItem>
                                </SelectContent>
                                </Select>
                                <span v-if="errors.status" class="text-red-500 text-sm">{{ errors.status }}</span>
                            </div>
                            <div class="grid">
                                <Label for="price" class="mb-3">Price</Label>
                                <Input id="price" v-model="form.price" type="text" class="w-full"  :class="{ 'border-red-500': errors.price }"/>
                                <span v-if="errors.price" class="text-red-500 text-sm">{{ errors.price }}</span>
                            </div>
                            <div class="grid">
                                <Label for="quantity" class="mb-3">Quantity</Label>
                                <Input id="quantity" v-model="form.quantity" type="text" class="w-full" :class="{ 'border-red-500': errors.quantity }"/>
                                <span v-if="errors.quantity" class="text-red-500 text-sm">{{ errors.quantity }}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                </div>
                <!-- Footer -->
                <div class="mt-6 flex items-center justify-end gap-2">
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
      quantity: null, 
    }), 
  },
});

const emit = defineEmits(['close', 'save']);

const form = ref({ ...props.initialForm });

//validator
const errors = ref({});

const validateForm = () => {
  errors.value = {};
  
  if (!form.value.name) errors.value.name = 'Name is required.';
  if (!form.value.description) errors.value.description = 'Description is required.';
  if (!form.value.status) errors.value.status = 'Status is required.';
  if (!form.value.price || isNaN(form.value.price)) {
    errors.value.price = 'Price must be a valid number.';
  }
  if (!form.value.quantity || isNaN(form.value.quantity)) {
    errors.value.quantity = 'Quantity must be a valid number.';
  }

  return Object.keys(errors.value).length === 0; // Form is valid if no errors
};

const saveProduct = () => {
  if (!validateForm()) return; // Stop if validation fail
  emit('save', form.value);
  form.value = { name: '',description: '', status: '', price: null, quantity: null }; // Reset form with quantity
};
</script>

<style scoped>
button {
    transition: background-color 0.2s;
}
</style>