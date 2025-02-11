interface AcomodacaoBelow {
  isOpen?: boolean;
  children?: React.ReactNode;
}

export function AcomodacaoBelow({ isOpen, children }: AcomodacaoBelow) {
  return <div className={`border-t p-6 ${isOpen ? "" : "hidden"}`}>{children}</div>;
}
