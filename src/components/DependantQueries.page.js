import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

const DependantQueries = ({ email }) => {
  const { data: user } = useQuery(['user', email], () => fetchUserByEmail(email));
  const channelId = user?.data.channelId;
  const { data: channel } = useQuery(['courses'], () => fetchCoursesByChannelId(channelId), {
    enabled: !!channelId,
  });

  //   console.log(channel?.data.courses);

  return (
    <div>
      <h2>DependantQueries</h2>
      {channel?.data.courses.map((elem) => (
        <p key={elem}>{elem}</p>
      ))}
    </div>
  );
};

export default DependantQueries;
