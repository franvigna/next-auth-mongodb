import Link from "next/link";
import RemoveBtn from "./RemoveBtn";

const getUsers = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/users", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading users: ", error);
  }
};

export default async function UserList() {
  const { users } = await getUsers();

  return (
    <>
      {users.map((u) => (
        <div
          key={u._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{u.fullname}</h2>
            <div>
              <p>{u.email}</p>
              <p>{u.role}</p>
            </div>
            <div className="flex gap-2">
            <RemoveBtn id={u._id} />
            <Link href={`/admin/editUser/${u._id}`}>
              Edit
            </Link>
          </div>
          </div>

        </div>
      ))}
    </>
  );
}
