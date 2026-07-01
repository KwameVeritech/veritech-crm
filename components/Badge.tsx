interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

export default function Badge({ label, variant = 'default' }: BadgeProps) {
  const colors: Record<string, { bg: string; color: string }> = {
    default: { bg: '#e0e0e0', color: '#333' },
    success: { bg: '#d4edda', color: '#155724' },
    warning: { bg: '#fff3cd', color: '#856404' },
    danger: { bg: '#f8d7da', color: '#721c24' },
    info: { bg: '#d1ecf1', color: '#0c5460' },
  };

  const style = colors[variant];

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 600,
        background: style.bg,
        color: style.color,
      }}
    >
      {label}
    </span>
  );
}

