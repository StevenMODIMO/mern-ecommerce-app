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
    path: "/products",
    title: "Market place",
  },
  {
    id: 5,
    path: "/dashboard",
    title: "Dashboard",
  },
  {
    id: 6,
    path: "/cart",
    title: "Cart",
  },
  {
    id: 7,
    path: "/orders",
    title: "Orders",
  },
  {
    id: 8,
    path: "/invoices",
    title: "Invoices",
  },
  {
    id: 9,
    path: "/wishlist",
    title: "Wishlist",
  },
];
