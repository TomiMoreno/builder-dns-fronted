import { Container, Text, Divider } from "@nextui-org/react";

export function Header() {
  return (
    <>
      <Container as="header">
        <Text h4>Builder DNS</Text>
      </Container>
      <Divider />
    </>
  );
}
