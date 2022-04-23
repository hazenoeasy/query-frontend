# API Document

## HomePage

{% swagger method="get" path="/topic/popular" baseUrl="" summary="fetch the top K popular topics" %}
{% swagger-description %}
 return topicId, tname, qnumber(question numbers)
{% endswagger-description %}

{% swagger-parameter in="path" name="count" type="5" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
  [
    {
      topicId:
      tname:
      qnumber:
    },
  ]  
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/question/popular" baseUrl="" summary="fetch the top K popular questions" %}
{% swagger-description %}
return qid, title, dateTime, anumber(answer numbers)
{% endswagger-description %}

{% swagger-parameter in="path" name="count" type="5" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}

{% endswagger-response %}
{% endswagger %}

### Authentication

{% swagger method="post" path="/auth/register" baseUrl="" summary="sign up" %}
{% swagger-description %}
post username, passwd
{% endswagger-description %}

{% swagger-parameter in="body" name="username" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="passwd" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="The username has been used" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/auth/login" baseUrl="" summary="log in" %}
{% swagger-description %}
post username, passwd
{% endswagger-description %}

{% swagger-parameter in="body" name="username" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="passwd" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="wrongt passwd or username " %}
```javascript
{
    // Response
}
```
{% endswagger-response %}
{% endswagger %}

### UserCenter

{% swagger method="get" path="/profile" baseUrl="" summary="get user profile" %}
{% swagger-description %}
check if token and param are matched

return the whole user model except the password
{% endswagger-description %}

{% swagger-parameter in="path" name="uid" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="uid and token are not matched" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="not login" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="put" path="/profile" baseUrl="" summary="profile editor" %}
{% swagger-description %}
can set email,city,state,country,profile(introduction),password&#x20;

can't change status
{% endswagger-description %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}
{% endswagger %}

### Topic List

{% swagger method="get" path="/topic/getAll" baseUrl="" summary="get all topic" %}
{% swagger-description %}
return a list of topic 
{% endswagger-description %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/topic/list" baseUrl="" summary="get topic list by topicId" %}
{% swagger-description %}
return a list of topic 
{% endswagger-description %}

{% swagger-parameter in="path" name="tid" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="wrong param" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}
{% endswagger %}

### Question List

分页？

{% swagger method="get" path="/question/list" baseUrl="" summary="get question list by topicId" %}
{% swagger-description %}
return a list of question
{% endswagger-description %}

{% swagger-parameter in="path" name="tid" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="wrong params" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/question/create" baseUrl="" summary="create a new question" %}
{% swagger-description %}
post title,body,topicId
{% endswagger-description %}

{% swagger-parameter in="body" name="title" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="body" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" required="true" name="topicId" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}
{% endswagger %}

### Question Detail Page

{% swagger method="get" path="/question/detail" baseUrl="" summary="get question detail by questionId" %}
{% swagger-description %}
request with question id
{% endswagger-description %}

{% swagger-parameter in="path" name="qid" required="true" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="post" path="/question/reply" baseUrl="" summary="reply an answer under this questioin" %}
{% swagger-description %}
create an answer
{% endswagger-description %}

{% swagger-parameter in="body" name="answer" required="true" %}
a html string
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="not login" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/question/solved" baseUrl="" summary="Change the question's status True <--> False" %}
{% swagger-description %}
check if uid and token are matched
{% endswagger-description %}

{% swagger-parameter in="path" name="status" type="Boolean" required="true" %}
0 / 1 
{% endswagger-parameter %}

{% swagger-parameter in="path" name="qid" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="path" name="uid" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="not matched / wrong params" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="not login" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/answer/like" baseUrl="" summary="thumb up the question" %}
{% swagger-description %}
one user can only thumb up once?
{% endswagger-description %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/answer/best" baseUrl="" summary="mark this answer as the best answer" %}
{% swagger-description %}
only the question creator can mark it
{% endswagger-description %}

{% swagger-parameter in="path" name="uid" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="path" name="qid" required="true" %}

{% endswagger-parameter %}

{% swagger-parameter in="path" name="best" type="Boolean" required="true" %}
0 / 1
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}
{% endswagger %}

### Search&#x20;

{% swagger method="get" path="/search" baseUrl="" summary="query with keyword" %}
{% swagger-description %}
return a list of questions
{% endswagger-description %}

{% swagger-parameter in="path" name="keywd" %}

{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}
{% endswagger %}
