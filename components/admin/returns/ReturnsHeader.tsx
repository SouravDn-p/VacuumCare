interface ReturnsHeaderProps {
  pendingCount?: number;
}

export default function ReturnsHeader({ pendingCount = 2 }: ReturnsHeaderProps) {
  return (
    <div className="ret-header">
      <div className="ret-header__title-row">
        <h1 className="ret-header__title">Return requests</h1>
        {pendingCount > 0 && (
          <span className="ret-header__badge">{pendingCount} pending</span>
        )}
      </div>
      <p className="ret-header__subtitle">
        Review and process return requests
      </p>
    </div>
  );
}
