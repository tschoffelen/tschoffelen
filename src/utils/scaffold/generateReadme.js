export const generateReadme = (name) => {
  const titleName = name
    .split(/([\s_-]+)/gi)
    .map((part) => part[0].toUpperCase() + part.substring(1).toLowerCase())
    .join(" ");

  return `# ${titleName}

A serverless project.


### Running locally

Start serverless-offline:

\`\`\`
yarn
yarn start
\`\`\`

Run jest tests:

\`\`\`
yarn test
\`\`\`


### Deployment

Deploy to \`dev\` stage:

\`\`\`
yarn deploy
\`\`\`

Deploy to \`production\` stage:

\`\`\`
yarn deploy --stage production
\`\`\`
`;
};
