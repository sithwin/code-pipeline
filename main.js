const simpleGit = require('simple-git');

// Function to make a commit and push for a specific date
async function makeCommit(date, commits) {
  const git = simpleGit();
  const dateString = date.toISOString();
  
  // Set the environment variable GIT_AUTHOR_DATE and GIT_COMMITTER_DATE
  // to the specified date before making the commit
  process.env['GIT_AUTHOR_DATE'] = dateString;
  process.env['GIT_COMMITTER_DATE'] = dateString;

  try {
    // Make the commits
    const commit = commits[Math.floor(Math.random() * commits.length)];
      await git.add('./*').commit(commit, {'--allow-empty': null});
    // Push the commits to the remote repository
    await git.push();
    console.log(`Committed and pushed ${commits.length} commits for ${dateString} successfully!`);
  } catch (err) {
    console.error(`Failed to commit and push for ${dateString}:`, err);
  }
}

// Function to make commits and push for a date range
async function makeCommitsForDateRange(startDate, endDate, commits) {
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    await makeCommit(currentDate, commits);
    // Increment the current date by one day
    currentDate.setDate(currentDate.getDate() + 1);
  }
}

// Usage example
const startDate = new Date('2022-11-19T12:00:00Z');
const endDate = new Date('2022-11-21T12:00:00Z');
const commits = [
  'Creted serverless.yml',
  'Created apis',
  'Added authorizer',
  'Added dynamodb',
  'Set configuration'
];

makeCommitsForDateRange(startDate, endDate, commits);

