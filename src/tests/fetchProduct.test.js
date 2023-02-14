import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('should be a function', () => {
    expect(typeof fetchProduct).toBe('function');
  });
  
  it('should call fetch when executed', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  })

  it('should call fetch with the correct endpoint when executed', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561')
  })

  it('should have a return equal to product object', async () => {
    const response = await fetchProduct('MLB1405519561')
    expect(response).toEqual(product);
  });

  it('should throw a error when out of arguments', async () => {
    const response = fetchProduct()
    await expect(response).rejects.toThrow('ID não informado');
  });
});
