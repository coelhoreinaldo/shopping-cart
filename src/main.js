import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement, createCustomElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const sectionProducts = document.getElementById('products');

const listItems = async () => {
  const loadingSection = document.querySelector('#loading');
  const loading = createCustomElement('p', 'loading', 'carregando...');
  loadingSection.appendChild(loading);

  const response = await fetchProductsList('computador');
  response.forEach((item) => sectionProducts.appendChild(createProductElement(item)));

  loadingSection.removeChild(loading);
};

window.onload = () => {
  listItems();
};
