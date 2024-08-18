interface IProps {
  message?: string;
}

export function ErrorBoundary({ message = "Unexpected error" }: IProps) {
  return (
    <article
      style={{
        display: "flex",
        height: "100%",
        width: "calc(100% - 20px)",
        alignItems: "center",
        justifyContent: "center",
        color: "#444B58",
        padding: "0px 10px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: 26, fontWeight: 600 }}>{message}</h1>
    </article>
  );
}
