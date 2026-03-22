import { useEffect, useState } from "react";
import API from "@/lib/axios";
import type { User } from "@/lib/types";

export function useUsers(search: string) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await API.get("/users", { params: { search } });
        setUsers(res.data.users);
      } catch (err) {
        console.error("Fetch users error:", err);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(fetchUsers, 500);
    return () => clearTimeout(timeout);
  }, [search]);

  return { loading, users };
}
