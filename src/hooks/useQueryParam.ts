import { useSearchParams } from "react-router";

type PageQuery = { [key: string]: any; q?: string; page?: number };

export default function useQueryParams<T extends PageQuery>(
  initialQueryParams?: T
) {
  const [searchParams, setSearchParams] = useSearchParams(initialQueryParams);

  const updateQueryParams = <K extends keyof T>(
    key: K | Partial<T>,
    value?: T[K],
    replacePrevious?: boolean
  ) => {
    setSearchParams(
      (prevParams) => {
        if (typeof key !== "string") {
          let params = { ...Object.fromEntries(prevParams), ...(key as T) };

          Object.keys(params).forEach((key) => {
            if ([null, undefined].includes(params[key])) {
              delete params[key];
            }
          });

          return params;
        } else {
          if ([null, undefined].includes(value)) {
            prevParams.delete(key);
          } else {
            prevParams.set(key, value!);
          }
        }

        return prevParams;
      },
      { replace: replacePrevious }
    );
  };

  const clearAllFilters = () => setSearchParams(initialQueryParams);

  return {
    queryParams: Object.fromEntries(searchParams) as T,
    updateQueryParams,
    clearAllFilters,
  };
}
