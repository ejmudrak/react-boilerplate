/// <reference types="react-scripts" />

interface User extends Iterable<[string, string | number | null]> {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
