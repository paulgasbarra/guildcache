import React from "react";

export const Home: React.FC = () => (
  <>
    <div className="flex justify-between items-center container mx-auto mt-10">
      <div className="w-1/2 p-4">
        <h1 className="text-4xl font-bold text-gray-700 mb-2">
          Welcome to GuildCache
        </h1>
        <p className="text-gray-600">
          Manage students, instructors, and donors in a single, simple,
          relationship management system.
        </p>
      </div>
      <div className="w-1/2 text-right"></div>
    </div>
  </>
);
