import { useEffect, useState } from "react";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { Typography } from "@/components/ui/Typography/Typography";

type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Disable every control, e.g. while the next page is loading. */
  disabled?: boolean;
};

export const Pagination = ({
  page,
  pageCount,
  onPageChange,
  disabled,
}: PaginationProps) => {
  const [inputValue, setInputValue] = useState(String(page));

  // Keep the field showing the current page when it changes via the buttons.
  useEffect(() => {
    setInputValue(String(page));
  }, [page]);

  const goToTypedPage = () => {
    let typedPage = Number(inputValue);

    // Empty or not a number: just put the current page back.
    if (inputValue.trim() === "" || Number.isNaN(typedPage)) {
      setInputValue(String(page));
      return;
    }

    if (typedPage < 1) typedPage = 1;
    if (typedPage > pageCount) typedPage = pageCount;

    setInputValue(String(typedPage));
    onPageChange(typedPage);
  };

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between gap-2"
    >
      <div className="flex items-center gap-1">
        <Button
          variant="secondary"
          size="sm"
          aria-label="Première page"
          onClick={() => onPageChange(1)}
          disabled={disabled || page <= 1}
        >
          <ChevronFirst className="size-4" />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          aria-label="Page précédente"
          onClick={() => onPageChange(page - 1)}
          disabled={disabled || page <= 1}
        >
          <ChevronLeft className="size-4" />
        </Button>
      </div>

      <Typography variant="body-sm" as="div" className="flex items-center gap-2">
        <span>Page</span>
        <input
          type="number"
          min={1}
          max={pageCount}
          aria-label="Aller à la page"
          value={inputValue}
          disabled={disabled}
          onChange={(event) => setInputValue(event.target.value)}
          onBlur={goToTypedPage}
          onKeyDown={(event) => {
            if (event.key === "Enter") goToTypedPage();
          }}
          className="w-18 rounded-md border border-input bg-background px-2 py-1 text-center text-foreground"
        />
        <span aria-live="polite">/ {pageCount}</span>
      </Typography>

      <div className="flex items-center gap-1">
        <Button
          variant="secondary"
          size="sm"
          aria-label="Page suivante"
          onClick={() => onPageChange(page + 1)}
          disabled={disabled || page >= pageCount}
        >
          <ChevronRight className="size-4" />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          aria-label="Dernière page"
          onClick={() => onPageChange(pageCount)}
          disabled={disabled || page >= pageCount}
        >
          <ChevronLast className="size-4" />
        </Button>
      </div>
    </nav>
  );
};
