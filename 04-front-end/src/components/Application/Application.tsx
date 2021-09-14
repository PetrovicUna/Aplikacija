import React from 'react';
import { Container } from 'react-bootstrap';
import './Application.sass';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


class ApplicationState {
  authorizedRole: "user" | "administrator" | "visitor" = "visitor";
}

export default class Application extends React.Component {
  state: ApplicationState;

  constructor(props: any) {
    super(props);

    this.state = {
      authorizedRole: "visitor",
    };
  }
}
