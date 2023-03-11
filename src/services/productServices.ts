import axios from 'axios';

type SaveProductFunction = () => void;
export const saveProduct = () => {
  // console.log('saving product');

  axios.post('/products', {});
};
