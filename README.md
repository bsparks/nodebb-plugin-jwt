# NodeBB JWT Generator

NodeBB Plugin that provides a JWT (JSON Web Token) to use as access to other apps via shared secret.

## Installation

    npm install nodebb-plugin-jwt

## Configuration

1. Set your shared secret in the admin console
1. Visit /api/jwt and grab your encrypted token
1. Decode the token in another app, now NodeBB is your user base.
