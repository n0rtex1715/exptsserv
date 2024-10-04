/**
 * Express router paths go here.
 */


export default {
  Base: '/api',
  Users: {
    Base: '/users',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Examples: {
    Base: '/examples',
    Get: '/examples/all',
    Add: '/examples/add',
    Update: '/examples/update',
    Delete: '/examples/delete/:id',
  }
} as const;
