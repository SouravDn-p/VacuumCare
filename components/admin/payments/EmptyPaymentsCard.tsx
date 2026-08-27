interface EmptyPaymentsCardProps {
  message?: string;
}

export default function EmptyPaymentsCard({
  message = "No captured payments to display.",
}: EmptyPaymentsCardProps) {
  return (
    <div className="pay-empty-card">
      <p className="pay-empty-card__text">{message}</p>
    </div>
  );
}
