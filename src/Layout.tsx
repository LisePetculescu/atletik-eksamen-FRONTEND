import { ReactNode } from "react";
import NavHeader from "./NavHeader";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div>
      <header>
        <NavHeader />
      </header>
      <main>
        <div>{children}</div>
      </main>
    </div>
  );
}
