"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditUserForm({ id, fullname, email, role }) {
  const [newFullname, setNewFullname] = useState(fullname);
  const [newEmail, setNewEmail] = useState(email);
  const [newRole, setNewRole] = useState(role);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newFullname, newEmail, newRole }),
      });

      if (!res.ok) {
        throw new Error("Failed to update user");
      }

      router.refresh();
      router.push("/admin/record");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 items-center justify-start">
      <input
        onChange={(e) => setNewFullname(e.target.value)}
        className="bg-gray-600" 
        value={newFullname}
        type="text"
        placeholder="Nombre completo"
      />
      <br />

      <input
        onChange={(e) => setNewEmail(e.target.value)}
        className="bg-gray-600" 
        value={newEmail}
        type="email"
        placeholder="Email"
      />
      <br />

        <select 
            onChange={(e) => setNewRole(e.target.value)}
            className="bg-gray-600" 

        >
            <option value={newEmail} >-</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>

        </select>
    <br />

      <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
        Update User
      </button>
    </form>
  );
}
