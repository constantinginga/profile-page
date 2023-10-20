import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { ExternalLink } from '../types/userData';

const ExternalLinksSection = () => {
  const { user } = useContext(UserContext);
  console.log(user);

  const [updatedExternalLinks, setUpdatedExternalLinks] = useState<
    ExternalLink[]
  >([]);

  useEffect(() => {
    if (!user) return;
    if (user.ExternalLinksSection) {
      setUpdatedExternalLinks(user.ExternalLinksSection.ExternalLinks);
    }
  }, [user]);

  return (
    <section className="flex flex-col gap-4 flex-1">
      <h2 className="font-bold text-lg">External links</h2>
      {updatedExternalLinks.map((link, index) => (
        <div
          className="flex flex-col gap-2 bg-primary-content p-4 rounded-xl shadow-xl"
          key={index}>
          <p className="font-semibold">{link.Title}</p>
          <a className="link" href={link.Url}>
            {link.Url}
          </a>
        </div>
      ))}
    </section>
  );
};

export default ExternalLinksSection;
