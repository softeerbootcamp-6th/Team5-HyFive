import FallbackUI from "@/components/FallbackUI";
import BookSection from "@/features/book/BookSection";
import { ErrorBoundary } from "react-error-boundary";

const BookPage = () => {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <FallbackUI error={error} resetErrorBoundary={resetErrorBoundary} />
      )}
    >
      <BookSection />
    </ErrorBoundary>
  );
};

export default BookPage;
