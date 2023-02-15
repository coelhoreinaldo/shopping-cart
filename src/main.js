import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement, createCustomElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const sectionProducts = document.getElementById('products');
const loadingSection = document.querySelector('#loading');
const loading = createCustomElement('p', 'loading', 'carregando...');

const listItems = async () => {
  try {
    loadingSection.appendChild(loading);

    const response = await fetchProductsList('computador');
    response.forEach((item) => sectionProducts.appendChild(createProductElement(item)));

    loadingSection.removeChild(loading);
  } catch (error) {
    loadingSection.removeChild(loading);
    const errorMessage = 'Algum erro ocorreu, recarregue a página e tente novamente';
    const errorP = createCustomElement('p', 'error', errorMessage);
    loadingSection.appendChild(errorP);
  }
};

listItems();
