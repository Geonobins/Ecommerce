import { Slash } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "@/data/routes";
import React from "react";

export default function Breadcrumbs() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const path = pathname.split("/").filter((x) => x).map((name) => decodeURI(name));

  return (
    <div className="flex w-[90%] m-5 ">
    <Breadcrumb>
      <BreadcrumbList className="text-lg">
        {path.map((name, index) => {
          const route = routes[name as keyof typeof routes];
          const isLast = index === path.length - 1;

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{route? route.breadcrumb : decodeURI(name)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    onClick={() => navigate(route.path)}
                    className="cursor-pointer"
                  >
                    {route.breadcrumb}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
    </div>
  );
}
