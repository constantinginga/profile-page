import { FC } from 'react';
import { Activity } from '../../types/activity';

type ActivitySectionProps = {
  activity: Activity;
  setActivity?: (activity: Activity) => void;
  isExternal: boolean;
};

const ActivitySection: FC<ActivitySectionProps> = ({
  activity,
  isExternal,
  setActivity,
}) => {
  const handlePrivacyChange = () => {
    if (!setActivity) return;

    setActivity({
      ...activity,
      PrivacySetting: !activity.PrivacySetting,
    });
  };

  console.log(activity);

  return (
    <section className="flex flex-col gap-4 flex-1">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg">Activity</h2>
        {!isExternal && (
          <div className="form-control">
            <label className="label cursor-pointer gap-2">
              <span className="label-text">Is public</span>
              <input
                type="checkbox"
                className="toggle"
                checked={activity.PrivacySetting}
                onChange={handlePrivacyChange}
              />
            </label>
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <h3 className="font-semibold">Overall</h3>
        <div className="flex gap-4">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1.5em"
                  width="1.5em"
                  xmlns="http://www.w3.org/2000/svg">
                  <g id="Calendar">
                    <path
                      d="M18.438,4.954H16.5c0-0.346,0-0.691,0-1.036c0-0.124,0-0.248,0-0.372c0-0.262-0.23-0.512-0.5-0.5
            c-0.271,0.012-0.5,0.22-0.5,0.5c0,0.469,0,0.939,0,1.408h-7c0-0.346,0-0.691,0-1.036c0-0.124,0-0.248,0-0.372
            c0-0.262-0.23-0.512-0.5-0.5c-0.271,0.012-0.5,0.22-0.5,0.5c0,0.469,0,0.939,0,1.408H5.562c-1.378,0-2.5,1.122-2.5,2.5v11
            c0,1.379,1.122,2.5,2.5,2.5h12.875c1.379,0,2.5-1.121,2.5-2.5v-11C20.938,6.076,19.816,4.954,18.438,4.954z M5.562,5.954H7.5
            c0,0.073,0,0.147,0,0.22c0,0.124,0,0.248,0,0.372c0,0.262,0.23,0.512,0.5,0.5c0.271-0.012,0.5-0.22,0.5-0.5c0-0.197,0-0.394,0-0.592
            h7c0,0.073,0,0.147,0,0.22c0,0.124,0,0.248,0,0.372c0,0.262,0.23,0.512,0.5,0.5c0.271-0.012,0.5-0.22,0.5-0.5
            c0-0.197,0-0.394,0-0.592h1.937c0.827,0,1.5,0.673,1.5,1.5v1.584H4.062V7.454C4.062,6.627,4.735,5.954,5.562,5.954z M18.438,19.954
            H5.562c-0.827,0-1.5-0.673-1.5-1.5v-8.416h15.875v8.416C19.938,19.281,19.265,19.954,18.438,19.954z"></path>
                  </g>
                </svg>
              </div>
              <div className="stat-title">Join date</div>
              <div className="stat-value">
                {new Date(activity.JoinDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </div>
            </div>
          </div>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1.5em"
                  width="1.5em"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.226 7.25c-2.623-4.542-8.432-6.098-12.974-3.475-4.543 2.622-6.099 8.431-3.477 12.974 2.623 4.542 8.431 6.099 12.974 3.477a.75.75 0 0 1 .75 1.299c-5.26 3.037-11.987 1.235-15.024-4.026C-.562 12.24 1.24 5.512 6.501 2.475 11.76-.562 18.488 1.24 21.525 6.501a10.959 10.959 0 0 1 1.455 4.826c.013.056.02.113.02.173v2.25a3.5 3.5 0 0 1-6.623 1.581 5.5 5.5 0 1 1 1.112-3.682.802.802 0 0 1 .011.129v1.972a2 2 0 1 0 4 0v-1.766a9.456 9.456 0 0 0-1.274-4.733ZM16 12a4 4 0 1 0-8 0 4 4 0 0 0 8 0Z"></path>
                </svg>
              </div>
              <div className="stat-title">Total mentions</div>
              <div className="stat-value">{activity.NumberOfMentions}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {activity.ActivityGroups.map((act, i) => (
          <div className="flex flex-col" key={i}>
            <h3 className="font-semibold">{act.Name}</h3>
            <div className="flex gap-4">
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-figure">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="1.5em"
                      width="1.5em"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.263 2.177a1.75 1.75 0 0 1 2.474 0l2.586 2.586a1.75 1.75 0 0 1 0 2.474L19.53 10.03l-.012.013L8.69 20.378a1.753 1.753 0 0 1-.699.409l-5.523 1.68a.748.748 0 0 1-.747-.188.748.748 0 0 1-.188-.747l1.673-5.5a1.75 1.75 0 0 1 .466-.756L14.476 4.963ZM4.708 16.361a.26.26 0 0 0-.067.108l-1.264 4.154 4.177-1.271a.253.253 0 0 0 .1-.059l10.273-9.806-2.94-2.939-10.279 9.813ZM19 8.44l2.263-2.262a.25.25 0 0 0 0-.354l-2.586-2.586a.25.25 0 0 0-.354 0L16.061 5.5Z"></path>
                    </svg>
                  </div>
                  <div className="stat-title">Posts</div>
                  <div className="stat-value">{act.NumberOfPosts}</div>
                </div>
              </div>
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-figure">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="1.5em"
                      width="1.5em"
                      xmlns="http://www.w3.org/2000/svg">
                      <g id="Chat_1">
                        <path d="M3.316,19.937A1.251,1.251,0,0,1,2.065,18.69l0-1.716L2.068,6.56a2.5,2.5,0,0,1,2.5-2.5H19.44a2.5,2.5,0,0,1,2.5,2.5v8.41a2.5,2.5,0,0,1-2.5,2.5H6.918a1.49,1.49,0,0,0-1.06.439L4.2,19.57A1.246,1.246,0,0,1,3.316,19.937ZM4.568,5.062a1.5,1.5,0,0,0-1.5,1.5L3.06,16.973l0,1.714a.25.25,0,0,0,.427.176L5.151,17.2a2.482,2.482,0,0,1,1.767-.732H19.44a1.5,1.5,0,0,0,1.5-1.5V6.562a1.5,1.5,0,0,0-1.5-1.5Z"></path>
                      </g>
                    </svg>
                  </div>
                  <div className="stat-title">Comments</div>
                  <div className="stat-value">{act.NumberOfComments}</div>
                </div>
              </div>
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-figure">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block w-6 h-6 stroke-current">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                  </div>
                  <div className="stat-title">Likes</div>
                  <div className="stat-value">{act.NumberOfLikes}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActivitySection;
