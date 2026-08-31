type FormatDate = {
  year: number;
  month: number;
  monthOption?: "numeric" | "2-digit" | "long" | "short" | "narrow";
};

export const formatDate = ({ year, month, monthOption }: FormatDate) =>
  new Intl.DateTimeFormat("fr-FR", {
    month: monthOption,
    year: "numeric",
  }).format(new Date(year, month - 1));
