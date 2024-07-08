import { Button } from '@/components/ui/button';
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Task Manager</h1>
          <p className="mb-8">
            Stay organized and manage your tasks efficiently with Task Manager. Track your tasks, set deadlines, and
            achieve your goals with ease.
          </p>
          {/* <Button
            className=" px-6 py-3 rounded-md  transition duration-300"
            onClick={() => console.log('Get Started clicked!')}
          >
            Get Started
          </Button> */}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg shadow-md text-center dark:bg-white/5">
              <h3 className="text-xl font-bold mb-2">Task Tracking</h3>
              <p>
                Easily track your tasks with our intuitive task management system.
              </p>
            </div>
            <div className="p-6 rounded-lg shadow-md text-center dark:bg-white/5">
              <h3 className="text-xl font-bold mb-2">Deadline Reminders</h3>
              <p>
                Set deadlines and receive reminders to ensure you never miss a task.
              </p>
            </div>
            <div className="p-6 rounded-lg shadow-md text-center dark:bg-white/5">
              <h3 className="text-xl font-bold mb-2">Collaboration</h3>
              <p>
                Collaborate with your team and manage tasks together seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center ">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-lg shadow-md dark:bg-white/5">
              <p className="mb-4 ">
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

      {/* Call to Action Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center dark:bg-white/5">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="mb-8">
            Sign up today and take the first step towards better task management.
          </p>
          <Link className="underline font-bold" to="/auth/register">
          <Button
            className="  px-6 py-3 rounded-md  transition duration-300"
          >
            Sign Up
          </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
