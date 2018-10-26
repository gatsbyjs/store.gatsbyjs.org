import React from 'react';
// import styled from 'react-emotion';
import axios from 'axios';
import { Subheading } from '../shared/Typography';
import IssueList from './IssueList';

// To avoid overloading the GitHub API, let’s only load issues once per session.
let issues = false;
const getIssues = async () => {
  if (!issues) {
    const response = await axios.get(
      'https://api.github.com/repos/gatsbyjs/gatsby/issues',
      { params: { labels: 'status: help wanted' } }
    );

    issues = response.data;
  }

  return issues;
};

export default class OpenIssues extends React.Component {
  state = {
    issues: false
  };

  componentDidMount() {
    getIssues().then(issues => {
      const unclaimedIssues = issues.filter(
        issue => issue.labels.filter(
          label => label.name === 'Hacktoberfest - Claimed'
        ).length === 0
      )
      this.setState({ issues: unclaimedIssues });
    });
  }

  render() {
    return !issues ? (
      <p>Loading...</p>
    ) : (
      <>
        <Subheading>Issues We Could Use Your Help With</Subheading>
        <IssueList issues={this.state.issues.slice(0, 3)} />
      </>
    );
  }
}
