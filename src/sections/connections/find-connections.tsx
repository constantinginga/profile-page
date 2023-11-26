import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { MinimalUserData } from '../../types/userData';
import { toast } from 'react-hot-toast';
import MemberProfileCard from '../../components/member-profile-card';
import ProfileCard from '../../components/profile-card';

const FindConnections = ({ isMember }: { isMember: boolean }) => {
  const [search, setSearch] = useState('');
  const [profiles, setProfiles] = useState<MinimalUserData[]>([]);
  const [memberId, setMemberId] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const memberIdParam = params.get('memberId');
    const tokenParam = params.get('token');

    if (!memberIdParam || !tokenParam) return;

    setMemberId(memberIdParam);
    setToken(tokenParam);
  }, []);

  const searchProfiles = async (terms: string) => {
    setLoading(true);
    const response = await fetch(
      `https://localhost:7297/Profiles/SearchProfiles?memberId=${memberId}&token=${token}&terms=${terms}`,
      {
        method: 'GET',
      }
    );
    const data = await response.json();

    if (data.StatusCode) {
      toast.error('Something went wrong.');
      return null;
    }

    setLoading(false);

    return data as MinimalUserData[];
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!search || !search.trim()) return;

    const profilesFromDb = await searchProfiles(search);

    if (profilesFromDb) setProfiles(profilesFromDb);
  };

  if (!memberId || !token)
    return (
      <div>
        <p>You must be logged in to access this page.</p>
      </div>
    );

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
        <button
          type="submit"
          className="btn btn-primary btn-outline"
          disabled={loading}>
          {loading ? (
            <>
              <span className="loading loading-spinner"></span>
              Search
            </>
          ) : (
            <span>Search</span>
          )}
        </button>
      </form>
      <div className="flex flex-wrap gap-4">
        {isMember
          ? profiles.map((profile, i) => (
              <MemberProfileCard user={profile} key={i} />
            ))
          : profiles.map((profile, i) => (
              <ProfileCard user={profile} key={i} />
            ))}
      </div>
    </div>
  );
};

export default FindConnections;
