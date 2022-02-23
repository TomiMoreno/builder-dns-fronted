import { Container, Text } from "@nextui-org/react";

export function Header() {
  return (
    <Container
      css={{ borderBottom: "$white 1px solid", paddingBottom: "$4" }}
      as="header"
    >
      <Text h4>Builder DNS</Text>
    </Container>
  );
}
