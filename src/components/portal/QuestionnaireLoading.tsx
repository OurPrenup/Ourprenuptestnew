export default function QuestionnaireLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header skeleton */}
      <div>
        <div className="h-5 w-32 bg-navy/10 rounded-full mb-3" />
        <div className="h-9 w-72 bg-navy/10 rounded-lg mb-2" />
        <div className="h-5 w-96 bg-navy/5 rounded-lg" />
      </div>

      {/* Question skeletons */}
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-card rounded-[16px] border border-border p-6 space-y-3">
          <div className="h-5 w-64 bg-navy/10 rounded" />
          <div className="h-4 w-48 bg-navy/5 rounded" />
          <div className="h-12 w-full bg-navy/5 rounded-lg" />
        </div>
      ))}

      {/* Nav skeleton */}
      <div className="flex justify-between pt-4">
        <div className="h-10 w-36 bg-navy/10 rounded-full" />
        <div className="h-10 w-36 bg-navy/10 rounded-full" />
      </div>
    </div>
  );
}
