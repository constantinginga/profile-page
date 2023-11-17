import { useState, useContext, FormEvent, ChangeEvent } from 'react';
import { ConnectionContext } from '../../context/ConnectionContext';
import { MinimalUserData } from '../../types/userData';
import ProfileCard from '../../components/profile-card';

const FindConnections = () => {
  const { searchProfiles } = useContext(ConnectionContext);
  const [search, setSearch] = useState('');
  const [profiles, setProfiles] = useState<MinimalUserData[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!search || !search.trim()) return;

    const profilesFromDb = await searchProfiles(search);

    if (profilesFromDb) setProfiles(profilesFromDb);
  };

  return (
    <div className="flex flex-col gap-12">
      <form className="flex gap-4" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for connections"
          className="input input-bordered"
          name="search"
          onChange={handleChange}
          value={search}
        />
        <button type="submit" className="btn btn-primary btn-outline">
          Search
        </button>
      </form>
      <div className="flex flex-wrap gap-4">
        {profiles.map((profile, i) => (
          <ProfileCard user={profile} key={i} />
        ))}
      </div>
    </div>
  );
};

export default FindConnections;
