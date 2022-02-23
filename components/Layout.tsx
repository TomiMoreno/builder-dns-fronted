import { Container } from "@nextui-org/react";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container
      display="flex"
      direction="column"
      justify="space-between"
      css={{ minHeight: "100vh" }}
    >
      <Header />
      <Container css={{ flex: 1 }}>{children}</Container>
      <Footer />
    </Container>
  );
}
