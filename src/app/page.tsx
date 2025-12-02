export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="max-w-xl w-full p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-semibold mb-2">TaskFlow</h1>
        <p className="text-sm text-gray-600 mb-4">Team Task Management — demo frontend (Auth UI)</p>
        <div className="flex gap-2">
          <a href="/login" className="px-4 py-2 bg-blue-600 text-white rounded">Login</a>
          <a href="/register" className="px-4 py-2 border rounded">Register</a>
        </div>
      </div>
    </main>
  );
}
