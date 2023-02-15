import { getSavedCartIDs } from './helpers/cartFunctions';
import { searchCep } from './helpers/cepFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement, createCustomElement, createCartProductElement }
  from './helpers/shopFunctions';
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

window.onload = () => {
  const savedCart = getSavedCartIDs();
  const mapedItems = savedCart.map(async (id) => {
    const getProducts = await fetchProduct(id);
    return getProducts;
    // const productDom = createCartProductElement(getProducts);
    // const olCartList = document.querySelector('.cart__products');
    // olCartList.appendChild(productDom);
  });
  const xd = async () => {
    const promised = await Promise.all(mapedItems);
    promised.forEach((item) => {
      const productDom = createCartProductElement(item);
      const olCartList = document.querySelector('.cart__products');
      olCartList.appendChild(productDom);
    });
  };
  xd();
};
