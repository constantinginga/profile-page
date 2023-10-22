import { useState, useContext, FC, FormEvent } from 'react';
import { UserContext } from '../context/UserContext';
import { ExternalLink } from '../types/userData';
import { toast } from 'react-hot-toast';

type ExternalLinkProps = {
  externalLinks: ExternalLink[];
  setExternalLinks: (externalLinks: ExternalLink[]) => void;
};

type TFormFields = {
  title: string;
  url: string;
};

const defaultFormFields: TFormFields = {
  title: '',
  url: '',
};

const ExternalLinksSection: FC<ExternalLinkProps> = ({
  externalLinks,
  setExternalLinks,
}) => {
  const { user } = useContext(UserContext);
  const [formFields, setFormFields] = useState<TFormFields>(defaultFormFields);
  const [selectedExternalLinkId, setSelectedExternalLinkId] = useState<
    number | null
  >(null);
  const { title, url } = formFields;

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const openModal = () => {
    setSelectedExternalLinkId(null);
    setFormFields(defaultFormFields);
    window.new_external_link.showModal();
  };

  const handleCreateExternalLink = () => {
    if (!user) return;

    // check for empty fields
    if (!title || !url) {
      toast.error('Please fill out all fields');
      return;
    }

    window.new_external_link.close();

    const newExternalLink: ExternalLink = {
      // temporary, remove when it is serial
      ExternalLinkId: 3,
      MemberId: user.MemberId,
      Title: title,
      Url: url,
    };

    setExternalLinks([...externalLinks, newExternalLink]);

    toast.success('Successfully added. Please save your changes.');

    // reset form fields
    setFormFields(defaultFormFields);
  };

  const handleEditExternalLink = () => {
    if (!user) return;

    // check for empty fields
    if (!title || !url) {
      toast.error('Please fill out all fields');
      return;
    }

    window.new_external_link.close();

    if (!selectedExternalLinkId) return;

    const newExternalLink: ExternalLink = {
      // temporary, remove when it is serial
      ExternalLinkId: selectedExternalLinkId,
      MemberId: user.MemberId,
      Title: title,
      Url: url,
    };

    const newExternalLinkList = externalLinks.map((link) => {
      if (link.ExternalLinkId === selectedExternalLinkId) {
        return newExternalLink;
      }

      return link;
    });

    setExternalLinks(newExternalLinkList);

    toast.success('Successfully updated. Please save your changes.');

    // reset form fields
    setFormFields(defaultFormFields);
  };

  const handleRemoveExternalLink = (link: ExternalLink) => {
    const result = confirm(
      'Are you sure you want to remove this external link?'
    );

    if (!result) return;

    const newExternalLinks = externalLinks.filter(
      (l) => l.ExternalLinkId !== link.ExternalLinkId
    );

    setExternalLinks(newExternalLinks);

    toast.success('Successfully removed. Please save your changes.', {
      duration: 5000,
    });
  };

  const openEditModal = (link: ExternalLink) => {
    setFormFields({
      title: link.Title,
      url: link.Url,
    });

    setSelectedExternalLinkId(link.ExternalLinkId);

    window.new_external_link.showModal();
  };

  return (
    <section className="flex flex-col gap-4 flex-1">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">External links</h2>
        <button
          className="btn btn-sm btn-primary btn-outline w-fit my-4"
          onClick={openModal}>
          + New external link
        </button>
      </div>
      {externalLinks.map((link, index) => (
        <div key={index} className="flex items-end gap-4">
          <a
            className="link w-fit"
            href={link.Url.includes('http') ? link.Url : `https://${link.Url}`}
            target="_blank">
            {link.Title}
          </a>
          <div className="flex gap-2 items-center mt-2">
            <span
              className="cursor-pointer"
              onClick={() => handleRemoveExternalLink(link)}>
              <svg
                stroke="#F87272"
                fill="#F87272"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="1.25em"
                width="1.25em"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path>
              </svg>
            </span>
            <span
              className="cursor-pointer"
              onClick={() => openEditModal(link)}>
              <svg
                stroke="#3ABEF7"
                fill="#3ABEF7"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1.25em"
                width="1.25em"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z"></path>
              </svg>
            </span>
          </div>
        </div>
      ))}

      <dialog id="new_external_link" className="modal">
        <div className="modal-box flex flex-col gap-4">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">
            {selectedExternalLinkId !== null
              ? 'Update external link'
              : 'New external link'}
          </h3>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Title"
              className="input input-bordered"
              name="title"
              onChange={handleChange}
              value={title}
            />
            <input
              type="text"
              placeholder="URL"
              className="input input-bordered"
              name="url"
              onChange={handleChange}
              value={url}
            />
          </div>
          {selectedExternalLinkId !== null ? (
            <button
              className="btn btn-primary mt-4"
              onClick={handleEditExternalLink}>
              Update
            </button>
          ) : (
            <button
              className="btn btn-primary mt-4"
              onClick={handleCreateExternalLink}>
              Create
            </button>
          )}
        </div>
      </dialog>
    </section>
  );
};

export default ExternalLinksSection;
