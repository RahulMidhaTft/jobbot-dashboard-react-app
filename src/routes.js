import { DetailedInfo } from "./components/Dashboard/DetailedInfo";
import { Clicks } from "./components/Dashboard/Clicks-reports";

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
  {
    path: "/clicks",
    jsx: <Clicks />,
    requireAuth: true,
  },
];
