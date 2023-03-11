import axios from 'axios';

type SaveProductFunction = () => void;
export const saveProduct = async () => {
  console.log('saving product');
  const res = await axios.post('/products', {});

  return res;
};
