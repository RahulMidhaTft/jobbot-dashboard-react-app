import { DetailedInfo } from "./components/Dashboard/DetailedInfo";

export const routes = [
  {
    path: "/profiles",
    jsx: <DetailedInfo />,
    requireAuth: true,
  },
  {
    path: "/subs",
    jsx: <DetailedInfo />,
    requireAuth: true,
  },
];
