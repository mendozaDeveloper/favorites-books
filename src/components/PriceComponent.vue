<script setup>
import { ref } from 'vue';

const price = ref('');
const inputRef = ref(null);

const emit = defineEmits(['update:price']);

const formatPrice = (event) => {
    //elimino caracteres que no sean numeros o un punto
    let value = event.target.value.replace(/[^0-9.]/g, '');    
    emit('update:price', value);

    //limito 2 decimales
    const parts = value.split('.');
    if (parts.length > 2) {
        value = parts[0] + '.' + parts[1].substring(0, 2);
    } else if (parts.length === 2) {
        value = parts[0] + '.' + parts[1].substring(0, 2);
    }

    //separo el valor entero y lo decimal
    let integerPart = parts[0];
    const decimalPart = parts.length > 1 ? '.' + parts[1].substring(0, 2) : '.00';

    //formateo la parte entera
    const formattedIntegerPart = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0
    }).format(integerPart.replace(/,/g, ''));

    //Reemplazo comas por apostrofes en los millones
    const formattedValue = formattedIntegerPart.replace(/,/g, (match, offset, string) => {
        return string.length - offset > 6 ? "'" : ",";
    }) + decimalPart;

    price.value = formattedValue;
    
    //mantengo la posición del cursor
    const inputElement = inputRef.value;
    const start = inputElement.selectionStart;
    const end = inputElement.selectionEnd;
    setTimeout(() => {
        inputElement.setSelectionRange(start, end);
    }, 0);
}

//aseguro que ingresen caracteres numericos 
const isNumber = (event) => {
    const char = event.key;
    return /[0-9.]/.test(char);
}
</script>

<template>
    <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio</label>
    <input 
    type="text" 
    ref="inputRef" 
    v-model="price" 
    @input="formatPrice" 
    @keypress="isNumber" 
    name="category"
    id="category"
    placeholder="Agregar el precio del libro. Ejm: 0.00"
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
</template>
