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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPinHouse,
  Menu,
  House,
  KeySquare,
  UserRoundPlus,
  ShoppingCart,
  ChartNoAxesCombined,
  Handbag,
  Store,
  Logs,
  ReceiptText,
  Heart,
} from "lucide-react";
import { navLinks } from "@/lib/navlinks";
import { useAuthContext } from "@/hooks/useAuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

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
                  if (!state.user) {
                    return ["/", "/login", "/signup"].includes(path);
                  }

                  if (state.user.role === "seller") {
                    return ["/dashboard", "/invoices"].includes(path);
                  }

                  if (state.user.role === "buyer") {
                    return [
                      "/cart",
                      "/products",
                      "/orders",
                      "/wishlist",
                    ].includes(path);
                  }

                  return false;
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
                    case "/products":
                      Icon = Store;
                      break;
                    case "/orders":
                      Icon = Logs;
                      break;
                    case "/invoices":
                      Icon = ReceiptText;
                      break;
                    case "/wishlist":
                      Icon = Heart;
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
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage
                        src={state.user?.avatar_url}
                        alt={state.user?.display_name}
                      />
                      <AvatarFallback>
                        {state.user?.display_name?.[0] ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-fit">
                    <DropdownMenuLabel>Account Info</DropdownMenuLabel>
                    <DropdownMenuGroup>
                      <DropdownMenuItem className="hover:bg-transparent cursor-default pointer-events-none">
                        <Avatar>
                          <AvatarImage
                            src={state.user?.avatar_url}
                            alt={state.user?.display_name}
                          />
                          <AvatarFallback>
                            {state.user?.display_name?.[0] ?? "U"}
                          </AvatarFallback>
                        </Avatar>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <div className="font-bold">
                          {state.user.display_name}
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem>{state.user.email}</DropdownMenuItem>
                      <DropdownMenuItem>
                        <div className="text-xs font-light">
                          {state.user._id}
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-transparent">
                        <div className="font-bold">
                          <Badge
                            className={`${
                              state.user.role === "seller" && "bg-green-500"
                            }`}
                          >
                            {state.user.role === "buyer"
                              ? "BUYER"
                              : state.user.role === "seller"
                              ? "SELLER"
                              : "NOT_SET"}
                          </Badge>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="hover:bg-transparent">
                        <Button onClick={logout} className="p-2">
                          Logout
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* {state.user && (
                <NavigationMenuItem>
                  <Button onClick={logout} className="p-2">
                    Log out
                  </Button>
                </NavigationMenuItem>
              )} */}
              {/* {state.user && (
                <NavigationMenuItem>
                  <Avatar>
                    <AvatarImage
                      src={state.user.avatar_url}
                      alt={state.user.display_name}
                    />
                    <AvatarFallback>
                      {state.user?.display_name?.[0] ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                </NavigationMenuItem>
              )} */}
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
