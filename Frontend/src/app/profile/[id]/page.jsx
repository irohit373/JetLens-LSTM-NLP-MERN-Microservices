export default async function UserProfile({ params }) {
    const id =  params.id;
    return(
        <>
      <div className="flex h-screen justify-center items-center bg-gradient-to-r from-blue-100 to-white">
        <h1>
          <title>Profile - Jetlens</title>
        </h1>
        <div className="bg-white p-8 rounded-md shadow-lg w-96">
          <div className="flex justify-start mb-4">
            <h2 className="text-2xl font-bold text-blue-600">Jetlens</h2>
          </div>
          <h2 className="text-lg font-medium text-gray-600 mb-4">Your Profile</h2>
          {/* Profile content goes here */}
            <div className="mb-4">
                <p className="text-gray-700">User ID: {id}</p>
        </div>
      </div>
      </div>
      </>
    );
  }