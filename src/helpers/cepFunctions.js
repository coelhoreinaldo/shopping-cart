const errorMessage = 'CEP não encontrado';

export const getAddress = async (cep) => {
  if (!cep) {
    throw new Error(errorMessage);
  }
  const response1 = await fetch(`https://cep.awesomeapi.com.br/json/${cep}`);
  const data1 = await response1.json();
  const response2 = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
  const data2 = await response2.json();
  const finalResponse = await Promise.any([data1, data2]);
  return finalResponse;
};

export const searchCep = async () => {
  const cartAddressSpan = document.querySelector('.cart__address');
  try {
    const input = document.querySelector('.cep-input').value;
    const {
      address,
      street,
      district,
      neighborhood,
      state,
      city,
    } = await getAddress(input);
    if (!address) {
      throw new Error(errorMessage);
    }
    cartAddressSpan.innerHTML = `${address ?? street
    } - ${district ?? neighborhood} - ${city} - ${state}`;
  } catch (error) {
    cartAddressSpan.innerHTML = errorMessage;
    return error;
  }
};
