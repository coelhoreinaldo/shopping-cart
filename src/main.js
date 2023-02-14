import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const response = await fetchProductsList('computador');

console.log(response);

const sectionProducts = document.getElementById('products');

response.forEach((item) => sectionProducts.appendChild(createProductElement(item)));
