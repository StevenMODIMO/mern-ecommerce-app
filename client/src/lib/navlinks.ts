interface NavLinks {
  id: number;
  path: string;
  title: string;
}

export const navLinks: NavLinks[] = [
  {
    id: 1,
    path: "/",
    title: "Home",
  },
  {
    id: 2,
    path: "/signup",
    title: "Sign Up",
  },
  {
    id: 3,
    path: "/login",
    title: "Sign In",
  },
  {
    id: 4,
    path: "/dashboard",
    title: "Dashboard",
  },
  {
    id: 5,
    path: "/cart",
    title: "Cart",
  },
];
