/* eslint-disable import/extensions */
import { removeCartID, saveCartID } from './cartFunctions.js';
import { fetchProduct } from './fetchFunctions.js';

// Esses comentários que estão antes de cada uma das funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições!

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

export const updateTotalPrice = () => {
  const totalPrice = document.querySelector('.total-price');
  const cart = document.querySelector('.cart__products');
  const products = cart.querySelectorAll('.product__price__value');
  let value = 0;
  products.forEach((product) => {
    value += Number(product.innerText);
  });
  totalPrice.innerText = value.toFixed(2);
};

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'product__image';
  img.src = imageSource.replace('I.jpg', 'O.jpg');
  return img;
};

export const createCustomElement = (element, className, innerText = '') => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

export const getIdFromProduct = (product) => (
  product.querySelector('span.product__id').innerText
);

const removeCartProduct = (li, id) => {
  li.remove();
  removeCartID(id);
  updateTotalPrice();
};

export const createCartProductElement = ({ id, title, price, pictures }) => {
  const li = document.createElement('li');
  li.className = 'cart__product';
  const imgContainer = createCustomElement('div', 'cart__product__image-container');

  const img = createProductImageElement(pictures[0].url);
  imgContainer.appendChild(img);

  const img2 = createProductImageElement((pictures[1] || pictures[0]).url);
  imgContainer.appendChild(img2);

  li.appendChild(imgContainer);

  const infoContainer = createCustomElement('div', 'cart__product__info-container');
  infoContainer.appendChild(createCustomElement('span', 'product__title', title));
  const priceElement = createCustomElement('span', 'product__price', 'R$ ');
  priceElement.appendChild(createCustomElement('span', 'product__price__value', price));
  infoContainer.appendChild(priceElement);

  li.appendChild(infoContainer);

  const removeButton = createCustomElement(
    'i',
    'material-icons cart__product__remove',
    'delete',
  );
  li.appendChild(removeButton);

  li.addEventListener('click', () => removeCartProduct(li, id));
  return li;
};

export const createProductElement = ({ id, title, thumbnail, price }) => {
  const section = document.createElement('section');
  section.className = 'product';

  section.appendChild(createCustomElement('span', 'product__id', id));

  const thumbnailContainer = createCustomElement('div', 'img__container');
  thumbnailContainer.appendChild(createProductImageElement(thumbnail));
  section.appendChild(thumbnailContainer);

  section.appendChild(createCustomElement('span', 'product__title', title));

  const priceElement = createCustomElement('span', 'product__price', 'R$ ');
  priceElement.appendChild(createCustomElement('span', 'product__price__value', price));
  section.appendChild(priceElement);

  const cartButton = createCustomElement(
    'button',
    'product__add',
    'Adicionar ao carrinho!',
  );
  section.appendChild(cartButton);
  cartButton.addEventListener('click', async () => {
    const itemId = cartButton.parentNode.firstChild.innerText;
    saveCartID(itemId);
    const productData = await fetchProduct(itemId);

    const productDom = createCartProductElement(productData);
    const olCartList = document.querySelector('.cart__products');
    olCartList.appendChild(productDom);
    updateTotalPrice();
  });
  return section;
};
