import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export const NotFound = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="search" />
        Oops - I have looked everywhere but could not find what you are looking for!
      </Header>
      <Segment.Inline>
        <Button as={Link}>
          Return to Activities page.
        </Button>
      </Segment.Inline>
    </Segment>
  );
};

export default NotFound;
