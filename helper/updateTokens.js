import fs from 'node:fs';

export default update => {
  // Read blacklist-tokens
  const tokens = JSON.parse(
    fs.readFileSync(
      `${process.env.PWD}/middleware/token/blacklist-tokens.json`,
      {
        encoding: 'utf-8',
      }
    )
  );

  // Update blacklist-tokens
  const newTokens = update(tokens);

  // Write blacklist-tokens
  fs.writeFileSync(
    `${process.env.PWD}/middleware/token/blacklist-tokens.json`,
    JSON.stringify(newTokens)
  );
};
