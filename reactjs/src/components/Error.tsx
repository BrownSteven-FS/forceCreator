const ErrorComponent = ({ message }: { message: string }) => {
  return (
    <section>
      <h2 className="text-red-600 font-bold">Error</h2>
      <p>{message}</p>
    </section>
  );
};

export default ErrorComponent;
