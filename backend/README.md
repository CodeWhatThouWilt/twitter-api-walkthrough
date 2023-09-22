# Twitter Clone

## Database Schema Design

![schema]

[schema]: ./schema.png
[schema-info]: ./schema-info.txt

## API Documentation

## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a current user to be logged in.

- Request: endpoints that require authentication
- Error Response: Require authentication

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"message": "Authentication required",
    	"statusCode": 401
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the current user does not have the
correct role(s) or permission(s).

- Request: endpoints that require proper authorization
- Error Response: Require proper authorization

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"message": "Forbidden",
    	"statusCode": 403
    }
    ```

### Get the Current User

Returns the information about the current user that is logged in.

- Require Authentication: true
- Request

  - Method: GET
  - URL: /api/session
  - Body: none

- Successful Response when there is a logged in user

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"user": {
    		"id": 1,
    		"firstName": "John",
    		"lastName": "Smith",
    		"email": "john.smith@gmail.com",
    		"username": "JohnSmith"
    	}
    }
    ```

- Successful Response when there is no logged in user

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"user": null
    }
    ```

### Log In a User

Logs in a current user with valid credentials and returns the current user's
information.

- Require Authentication: false
- Request

  - Method: POST
  - URL: /api/session
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"credential": "john.smith@gmail.com",
    	"password": "secret password"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"user": {
    		"id": 1,
    		"firstName": "John",
    		"lastName": "Smith",
    		"email": "john.smith@gmail.com",
    		"username": "JohnSmith",
    		"token": ""
    	}
    }
    ```

- Error Response: Invalid credentials

  - Status Code: 401
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"message": "Invalid credentials",
    	"statusCode": 401
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"message": "Validation error",
    	"statusCode": 400,
    	"errors": ["Email or username is required", "Password is required"]
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the current
user's information.

- Require Authentication: false
- Request

  - Method: POST
  - URL: /api/users
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"firstName": "John",
    	"lastName": "Smith",
    	"email": "john.smith@gmail.com",
    	"username": "JohnSmith",
    	"password": "secret password"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"user": {
    		"id": 1,
    		"firstName": "John",
    		"lastName": "Smith",
    		"email": "john.smith@gmail.com",
    		"username": "JohnSmith",
    		"token": ""
    	}
    }
    ```

- Error response: User already exists with the specified email

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"message": "User already exists",
    	"statusCode": 403,
    	"errors": ["User with that email already exists"]
    }
    ```

- Error response: User already exists with the specified username

  - Status Code: 403
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"message": "User already exists",
    	"statusCode": 403,
    	"errors": ["User with that username already exists"]
    }
    ```

- Error response: Body validation errors

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"message": "Validation error",
    	"statusCode": 400,
    	"errors": [
    		"Invalid email",
    		"Username is required",
    		"First Name is required",
    		"Last Name is required"
    	]
    }
    ```

## Tweets

### Get all Tweets

Returns all the tweets.

- Require Authentication: false
- Request

  - Method: GET
  - URL: /api/tweets
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"Tweets": [
    		{
    			"id": 1,
    			"userId": 1,
    			"quoteTweetId": null,
    			"content": "This is my first tweet!",
    			"createdAt": "2021-11-19 20:39:36",
    			"updatedAt": "2021-11-19 20:39:36"
    		}
    	]
    }
    ```

### Get all Tweets posted by the Current User

Returns all the tweets posted (created) by the current user.

- Require Authentication: true
- Request

  - Method: GET
  - URL: /api/tweets/current
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"Tweets": [
    		{
    			"id": 1,
    			"userId": 1,
    			"quoteTweetId": null,
    			"content": "This is my first tweet!",
    			"createdAt": "2021-11-19 20:39:36",
    			"updatedAt": "2021-11-19 20:39:36",
    			"likesCount": 1,
    			"replyCount": 2
    		}
    	]
    }
    ```

### Get details of a Tweet from an id

Returns the details of a Tweet specified by its id.

- Require Authentication: false
- Request

  - Method: GET
  - URL: /api/tweets/:tweetId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"id": 1,
    	"userId": 1,
    	"quoteTweetId": null,
    	"content": "This is my first tweet!",
    	"createdAt": "2021-11-19 20:39:36",
    	"updatedAt": "2021-11-19 20:39:36",
    	"likeCount": 2,
    	"User": {
    		"username": "JohnSmith"
    	},
    	"Replies": [
    		{
    			"id": 1,
    			"tweetId": 1,
    			"parentReplyId": null,
    			"content": "Welcome!!",
    			"createdAt": "2021-11-19 20:39:36",
    			"updatedAt": "2021-11-19 20:39:36"
    		},
    		{
    			"id": 1,
    			"tweetId": 1,
    			"parentReplyId": null,
    			"content": "Welcome!!",
    			"createdAt": "2021-11-19 20:39:36",
    			"updatedAt": "2021-11-19 20:39:36"
    		}
    	]
    }
    ```

- Error response: Couldn't find a Tweet with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"message": "Tweet couldn't be found",
    	"statusCode": 404
    }
    ```

### Create a Tweet

Creates and returns a new Tweet.

- Require Authentication: true
- Request

  - Method: POST
  - URL: /api/tweets
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"content": "This is my second tweet!"
    }
    ```

- Successful Response

  - Status Code: 201
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"id": 2,
    	"userId": 1,
    	"quoteTweetId": null,
    	"content": "This is my second tweet!",
    	"createdAt": "2021-11-19 20:39:36",
    	"updatedAt": "2021-11-19 20:39:36"
    }
    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"message": "Validation Error",
    	"statusCode": 400,
    	"errors": [
    		"Content is required",
    		"Content must be less than 255 characters"
    	]
    }
    ```

### Edit a Tweet

Updates and returns an existing Tweet.

- Require Authentication: true
- Require proper authorization: Tweet must belong to the current user
- Request

  - Method: PUT
  - URL: /api/tweets/:tweetId
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"content": "This is my second tweet and I just edited it!"
    }
    ```

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"id": 2,
    	"userId": 1,
    	"quoteTweetId": null,
    	"content": "This is my second tweet and I just edited it!",
    	"createdAt": "2021-11-19 20:39:36",
    	"updatedAt": "2021-11-20 11:11:11"
    }
    ```

- Error Response: Body validation error

  - Status Code: 400
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"message": "Validation Error",
    	"statusCode": 400,
    	"errors": [
    		"Content is required",
    		"Content must be less than 255 characters"
    	]
    }
    ```

- Error response: Couldn't find a Tweet with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"message": "Tweet couldn't be found",
    	"statusCode": 404
    }
    ```

### Delete a Tweet

Deletes an existing Tweet.

- Require Authentication: true
- Require proper authorization: Tweet must belong to the current user
- Request

  - Method: DELETE
  - URL: /api/tweet/:tweetId
  - Body: none

- Successful Response

  - Status Code: 200
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"message": "Successfully deleted",
    	"statusCode": 200
    }
    ```

- Error response: Couldn't find a Tweet with the specified id

  - Status Code: 404
  - Headers:
    - Content-Type: application/json
  - Body:

    ```json
    {
    	"message": "Tweet couldn't be found",
    	"statusCode": 404
    }
    ```
