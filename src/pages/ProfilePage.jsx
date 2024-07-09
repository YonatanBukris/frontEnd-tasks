import React from 'react';
import { useUserContext } from '@/components/userProvider';

function ProfilePage() {
  const { user } = useUserContext();

  if (!user) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-white/5 shadow-md rounded-lg p-6 max-w-sm w-full border-gray-300 ">
        <div className="flex items-center mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
           
          </div>
          <div className="ml-4">
            <h1 className="text-xl font-bold">{user.firstName} {user.lastName}</h1>
          </div>
        </div>
        <div >
          <p className="mb-2"><strong>Email:</strong> {user.email}</p>
          <p><strong>Joined:</strong> {new Date().toLocaleDateString()}</p>
          {/* Add more user info here as needed */}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
