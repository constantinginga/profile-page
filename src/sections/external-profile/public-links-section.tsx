import { FC } from 'react';
import { ExternalLink } from '../../types/userData';

type PublicLinksSectionProps = {
  externalLinks: ExternalLink[];
};

const PublicLinksSection: FC<PublicLinksSectionProps> = ({ externalLinks }) => {
  return (
    <section className="flex flex-col gap-4 flex-1">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">External links</h2>
      </div>
      {externalLinks.map((link, index) => (
        <div key={index} className="flex items-end gap-4">
          <a
            className="link w-fit"
            href={link.Url.includes('http') ? link.Url : `https://${link.Url}`}
            target="_blank">
            {link.Title}
          </a>
        </div>
      ))}
    </section>
  );
};

export default PublicLinksSection;
