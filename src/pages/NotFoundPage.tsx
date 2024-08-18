import { ErrorBoundary } from "@/components/errorBoundary/ErrorBoundary";

export function NotFoundPage() {
  return <ErrorBoundary message="404 | Page not found" />;
}
