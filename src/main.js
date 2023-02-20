/* eslint-disable import/extensions */
import { getSavedCartIDs } from './helpers/cartFunctions.js';
import { searchCep } from './helpers/cepFunctions.js';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions.js';
import { createProductElement, createCustomElement, createCartProductElement,
  updateTotalPrice }
  from './helpers/shopFunctions.js';

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

window.onload = () => {
  const savedCart = getSavedCartIDs();
  const mapedItems = savedCart.map(async (id) => {
    const getProducts = await fetchProduct(id);
    return getProducts;
  });
  const getLocalStorageCartItems = async () => {
    const promised = await Promise.all(mapedItems);
    promised.forEach((item) => {
      const productDom = createCartProductElement(item);
      const olCartList = document.querySelector('.cart__products');
      olCartList.appendChild(productDom);
    });
    updateTotalPrice();
  };
  getLocalStorageCartItems();
};
