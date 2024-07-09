import React from 'react';

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      {/* Hero Section */}
      <section className="w-full text-center py-16">
        <h1 className="text-5xl font-bold mb-4">About Task Manager</h1>
        <p className="text-lg mb-4 max-w-2xl mx-auto">
          Task Manager is an intuitive and efficient way to organize and manage your tasks. Whether you're working solo or collaborating with a team, our app helps you stay on top of your tasks, set deadlines, and achieve your goals.
        </p>
      </section>

     

      {/* Mission Section */}
      <section className="w-full py-16 bg-gray-100 dark:bg-white/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg mb-8">
            Our mission is to provide a user-friendly platform that simplifies task management and boosts productivity. We aim to help individuals and organizations achieve their goals efficiently through a well-organized and intuitive system.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-lg shadow-md dark:bg-white/5">
              <p className="mb-4">
                "Task Manager has completely transformed the way I organize my work. It's incredibly user-friendly and efficient."
              </p>
              <h3 className="text-lg font-bold">- Jane Doe</h3>
            </div>
            <div className="p-6 rounded-lg shadow-md dark:bg-white/5">
              <p className="mb-4">
                "I love the collaboration feature! It makes it so easy to manage tasks with my team."
              </p>
              <h3 className="text-lg font-bold">- John Smith</h3>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default AboutPage;
