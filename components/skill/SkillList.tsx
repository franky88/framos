"use client";

import { useEffect, useState } from "react";
import { addSkill, fetchUserWithSkills } from "@/app/actions";

const SkillList = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      const data = await fetchUserWithSkills();
      setUser(data);
    }
    loadData();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await addSkill(formData);
    window.location.reload(); // Refresh to see new skill
  };

  return (
    <>
      <h1>User Skills</h1>
      {user ? (
        <>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <h2>Skills</h2>
          <ul>
            {user.skills.map((skill: any) => (
              <li key={skill._id}>
                {skill.name} - {skill.application}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading...</p>
      )}

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Skill Name" required />
        <input
          type="text"
          name="application"
          placeholder="Application"
          required
        />
        <button type="submit">Add Skill</button>
      </form>
    </>
  );
};

export default SkillList;
