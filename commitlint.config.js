export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Type of the commit must be present in commit messages
    'type-enum': [
      2,
      'always',
      [
        'feat', // A new feature
        'fix', // A bug fix
        'docs', // Documentation only changes
        'style', // Changes that do not affect the meaning of the code (white-space, formatting, etc.)
        'refactor', // A code change that neither fixes a bug nor adds a feature
        'perf', // A code change that improves performance
        'test', // Adding missing tests or correcting existing tests
        'build', // Changes that affect the build system or external dependencies
        'ci', // Changes to CI configuration files and scripts
        'chore', // Other changes that don't modify src or test files
        'revert', // Reverts a previous commit
      ],
    ],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'scope-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    'scope-enum': [
      2,
      'always',
      [
        'components', // Changes to reusable components
        'hooks', // Changes to custom React hooks
        'state', // State management (e.g., Redux, Context API)
        'routing', // Changes to routing/navigation logic
        'styles', // CSS, SCSS, styled-components, or Tailwind
        'api', // API calls or data fetching logic
        'config', // Configuration files (e.g., Webpack, Babel)
        'deps', // Dependencies (add, remove, update)
        'utils', // Utility functions
        'testing', // Unit, integration, or E2E tests
        'docs', // Documentation or inline comments
      ],
    ],
    // header has value or fewer characters
    'header-max-length': [2, 'always', 100],
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    // footer should have a leading blank line
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
  },
};
