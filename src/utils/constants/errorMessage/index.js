const errorMessage = {
    ACCESS: {
        NO_AUTH: 'Authentication is needed. Please log in.',
        INVALID_AUTH_TYPE: 'Invalid authorization type. Only Bearer authentication is allowed.',
        BLACKLISTED_TOKEN: 'Invalid token. Please log in again.',
        TOKEN_EXPIRED: 'Invalid token: token has expired. Please log in again.',
    },
    LOGOUT: {
        NO_AUTH: 'Can\'t log out. You haven\'t logged in for this session yet.',
        BLACKLISTED_TOKEN: 'You\'ve logged out before. No need to log out again.',
        TOKEN_EXPIRED: 'Can\'t log out. Invalid token: token has expired.'
    }
}

module.exports = errorMessage