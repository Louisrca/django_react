import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button/Button";
import { Typography } from "@/components/ui/Typography/Typography";

type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Disable both buttons, e.g. while the next page is loading. */
  disabled?: boolean;
};

export const Pagination = ({
  page,
  pageCount,
  onPageChange,
  disabled,
}: PaginationProps) => (
  <nav
    aria-label="Pagination"
    className="flex items-center justify-between gap-4"
  >
    <Button
      variant="secondary"
      size="sm"
      onClick={() => onPageChange(page - 1)}
      disabled={disabled || page <= 1}
    >
      <ChevronLeft className="size-4" />
      Précédent
    </Button>

    <Typography variant="body-sm" aria-live="polite">
      Page {page} / {pageCount}
    </Typography>

    <Button
      variant="secondary"
      size="sm"
      onClick={() => onPageChange(page + 1)}
      disabled={disabled || page >= pageCount}
    >
      Suivant
      <ChevronRight className="size-4" />
    </Button>
  </nav>
);
