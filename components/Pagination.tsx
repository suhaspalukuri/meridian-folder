interface Props {
  page: number
  totalPages: number
  onPageChange: (p: number) => void
}

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null
  return (
    <div className="flex items-center justify-center gap-4 mt-16 pt-8 border-t border-ink/10">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="text-2xs uppercase tracking-normal text-ink/50 hover:text-ink disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
      >
        ← Previous
      </button>
      <span className="text-2xs text-ink/30">{page} / {totalPages}</span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="text-2xs uppercase tracking-normal text-ink/50 hover:text-ink disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
      >
        Next →
      </button>
    </div>
  )
}
