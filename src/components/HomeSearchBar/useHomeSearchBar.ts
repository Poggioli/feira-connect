import { isEnterKey } from "@/lib/utils";
import { useGetCities } from "@/services/getCities";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";

export function useHomeSearchBar() {
  const { q = "" } = useSearch({
    from: "/",
  });
  const navigate = useNavigate({ from: "/" });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const citiesService = useGetCities(q, { enabled: false });

  function handleSearch(): void {
    if (q) {
      setIsOpen(true);
      citiesService.fetchNextPage();
    }
  }

  function handleOnChangeSearchValue(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    navigate({
      search: {
        q: event.target.value,
      },
      replace: true,
    });
  }

  function handleOnKeyPress(event: KeyboardEvent<HTMLInputElement>): void {
    if (isEnterKey(event)) {
      handleSearch();
    }
  }

  useEffect(() => {
    if (q) {
      handleSearch();
    }
  }, []);

  return {
    searchValue: q,
    handleSearch,
    handleOnChangeSearchValue,
    handleOnKeyPress,
    onOpenChange: setIsOpen,
    isOpen,
    citiesService,
  };
}
