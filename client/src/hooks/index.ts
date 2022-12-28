import useSwr from 'swr';
import fetcher from '../fetcher';
import { IProduct, IUser } from '../interfaces';

export const useUser = ({
  fallbackData,
}: {
  fallbackData: IUser | null | undefined;
}) => {
  const { data, isLoading, isValidating, error } = useSwr<IUser | null>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/users/me`,
    fetcher,
    { fallbackData }
  );
  return {
    user: data,
    isLoading,
    isError: error,
    isValidating,
  };
};

export const useGetProducts = () => {
  const { data, isLoading, isValidating, error } = useSwr<[IProduct] | null>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/products`,
    fetcher
  );
  return {
    data,
    isLoading,
    isError: error,
    isValidating,
  };
};
