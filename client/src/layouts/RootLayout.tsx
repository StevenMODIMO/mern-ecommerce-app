import { Outlet, NavLink, useLocation } from "react-router";
import { useEffect, useState } from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MapPinHouse,
  Menu,
  House,
  KeySquare,
  UserRoundPlus,
  ShoppingCart,
  ChartNoAxesCombined,
  Handbag,
} from "lucide-react";
import { navLinks } from "@/lib/navlinks";

import { useAuthContext } from "@/hooks/useAuthContext";

export default function RootLayout() {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  const { state, dispatch } = useAuthContext();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
  };

  const IPINFO_TOKEN = import.meta.env.VITE_IPINFO_TOKEN;

  useEffect(() => {
    const getCountry = async () => {
      setLoading(true);
      const response = await fetch(
        `https://ipinfo.io/json?token=${IPINFO_TOKEN}`
      );
      const json = await response.json();
      if (response.ok) {
        setCountry(json.country);
        setCity(json.city);
        setLoading(false);
      }
    };
    getCountry();
  }, []);

  const getCountryFlagClass = (country: string) => {
    return `fi fi-${country.toLowerCase()} fis rounded-full`;
  };

  return (
    <div className="font-medium">
      <div className="fixed top-0 left-0 w-full">
        <Card className="p-2 rounded-none shadow-none">
          <CardHeader className="flex items-center gap-2 sm:justify-center">
            <MapPinHouse className="w-4 h-4" />
            {loading ? (
              <Skeleton className="w-64 h-3" />
            ) : (
              <CardDescription>
                Deliver to {city},{country}{" "}
                <span className={getCountryFlagClass(country)}></span>
              </CardDescription>
            )}
          </CardHeader>
        </Card>
        <nav className="flex justify-around md:justify-between items-center shadow-xs py-2 md:px-6">
          <NavLink className="flex items-center gap-1" to="/">
            <Handbag className="text-[#737373] w-6 h-6" />
            <h1 className="text-sm">Mern Store</h1>
          </NavLink>
          <NavigationMenu>
            <NavigationMenuList className="flex">
              {navLinks
                .filter(({ path }) => {
                  if (state.user) {
                    return ["/dashboard", "/cart"].includes(path);
                  } else {
                    return ["/", "/login", "/signup"].includes(path);
                  }
                })
                .map(({ id, path, title }) => {
                  let Icon;
                  switch (path) {
                    case "/":
                      Icon = House;
                      break;
                    case "/login":
                      Icon = KeySquare;
                      break;
                    case "/signup":
                      Icon = UserRoundPlus;
                      break;
                    case "/cart":
                      Icon = ShoppingCart;
                      break;
                    case "/dashboard":
                      Icon = ChartNoAxesCombined;
                      break;
                    default:
                      Icon = Menu; // fallback
                  }
                  return (
                    <NavigationMenuItem key={id}>
                      <NavigationMenuLink
                        asChild
                        className="hover:bg-transparent focus:bg-transparent focus:text-none"
                      >
                        <NavLink to={path}>
                          <div className="md:flex md:items-center gap-2">
                            <Icon
                              className={`${
                                pathname === path &&
                                "text-[#f0b100] lg:text-[#737373]"
                              }`}
                            />
                            <span
                              className={`hidden md:block ${
                                pathname === path && "text-[#737373]"
                              }`}
                            >
                              {title}
                            </span>
                          </div>
                        </NavLink>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              {state.user && (
                <NavigationMenuItem>
                  <Button onClick={logout}>Log out</Button>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
          <Menu className="hidden" />
        </nav>
      </div>
      <Card className="shadow-none rounded-none mt-20 border-none">
        <CardContent>
          <Outlet />
        </CardContent>
      </Card>
    </div>
  );
}
