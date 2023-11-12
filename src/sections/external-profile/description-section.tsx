const ExternalDescriptionSection = ({
  description,
}: {
  description: string;
}) => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-bold text-lg">About me</h2>
      <p>{description}</p>
    </section>
  );
};

export default ExternalDescriptionSection;
