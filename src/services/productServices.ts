import axios from 'axios';

export interface Product {
  name: string;
  size: string;
  type: string;
}

// type SaveProductFunction = () => void;
export const saveProduct = async (product: Product) => {
  console.log(`saving product ${JSON.stringify(product)}`);

  const res = await axios.post('/products', product);

  return res;
};
//
