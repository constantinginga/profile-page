const ServicesSection = ({ services }: { services: string }) => {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-bold text-lg">What can I help you with?</h2>
      <p>{services}</p>
    </section>
  );
};

export default ServicesSection;
