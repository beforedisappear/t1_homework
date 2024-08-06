import { useParams } from "react-router-dom";

export function ProductByIdPage() {
  const { id } = useParams<{ id: string }>();

  return <>{`product by ${id} page`}</>;
}
