import useSwr, { SWRConfiguration } from 'swr';
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

export const useFetchData = <T>(url: string, options: SWRConfiguration) => {
  const { data, isLoading, isValidating, error } = useSwr<T | null>(
    url,
    fetcher,
    options
  );
  return {
    data,
    isLoading,
    isError: error,
    isValidating,
  };
};
