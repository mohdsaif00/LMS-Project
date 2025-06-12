

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-10">Welcome to the LMS Project</h1>
      <p className="text-center mt-4">This is a simple learning management system built with Next.js.</p>
      <div className="flex justify-center mt-8">
        <a href="/courses" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          View Courses
        </a>
      </div>
    </div>
  );
}
