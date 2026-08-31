export const ClientDetailsSkeleton = () => {
  return (
    <div className="flex flex-col w-152 h-84.75 border border-slate-200 rounded-md p-2.5  gap-2.5">
      <div className="flex flex-row gap-2.5">
        <div className="h-6 w-34 bg-slate-100 rounded-md animate-pulse"></div>
        <div className="h-6 w-20 bg-slate-100 rounded-md animate-pulse"></div>
        <div className="h-6 w-34 bg-slate-100 rounded-full px-2 py-0.5  animate-pulse"></div>
      </div>

      <div className="h-full w-full bg-slate-100 rounded-xl animate-pulse"></div>
    </div>
  );
};
