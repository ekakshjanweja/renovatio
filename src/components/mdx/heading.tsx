export const H1 = ({ text }: { text: string }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground py-6">{text}</h1>
    </div>
  );
};
