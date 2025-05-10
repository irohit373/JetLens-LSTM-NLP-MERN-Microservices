export default function ProfilePage() {
  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-r from-blue-100 to-white">
      <Head>
        <title>Profile - Jetlens</title>
      </Head>
      <div className="bg-white p-8 rounded-md shadow-lg w-96">
        <div className="flex justify-start mb-4">
          <h2 className="text-2xl font-bold text-blue-600">Jetlens</h2>
        </div>
        <h2 className="text-lg font-medium text-gray-600 mb-4">Your Profile</h2>
        {/* Profile content goes here */}
      </div>
    </div>
  );
}