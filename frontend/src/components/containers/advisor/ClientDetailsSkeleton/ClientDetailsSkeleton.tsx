export const ClientDetailsSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-2.5 rounded-md border border-border p-2.5">
      <div className="flex flex-row justify-between gap-2.5">
        <div className="flex flex-row gap-2">
          <div className="h-6 w-20 animate-pulse rounded-md bg-muted"></div>
          <div className="h-6 w-28 animate-pulse rounded-md bg-muted sm:w-34"></div>
        </div>
        <div className="h-8 w-18 animate-pulse rounded-md bg-muted"></div>
      </div>

      <div className="h-56 w-full animate-pulse rounded-xl bg-muted sm:h-72"></div>

      <div className="flex flex-row flex-wrap justify-between gap-2">
        <div className="h-6 w-28 animate-pulse rounded-full bg-muted sm:w-34"></div>
        <div className="h-6 w-28 animate-pulse rounded-full bg-muted sm:w-34"></div>
      </div>
    </div>
  );
};
