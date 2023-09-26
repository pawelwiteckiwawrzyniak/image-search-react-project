import css from './Loader.module.css';
import { Rings } from 'react-loader-spinner';
export const Loader = () => {
  return (
    <Rings
      height="60"
      width="60"
      color="#6773b6"
      radius="6"
      wrapperStyle={{}}
      wrapperClass={css.loader}
      visible={true}
      ariaLabel="rings-loading"
    />
  );
};
