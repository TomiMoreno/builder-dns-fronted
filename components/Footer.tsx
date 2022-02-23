import { Container, Text } from "@nextui-org/react";

const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

export function Footer() {
  return (
    <Container as="footer">
      <Text h5>
        built with{" "}
        <a href={TWITTER_LINK} target="_blank" rel="noopener noreferrer">
          @{TWITTER_HANDLE}
        </a>
      </Text>
    </Container>
  );
}
