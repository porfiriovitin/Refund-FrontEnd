type UserAPIRole = "employee" | "manager";

type UserAPIResponse = {
  token: string;
  user: {
    id: String;
    name: String;
    email: String;
    role: UserAPIRole;
  };
};
