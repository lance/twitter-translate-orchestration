# Node.js Translation Function

This is a Node.js Knative function which recieves CloudEvents containing tweet text, and uses the Google Translation API to convert the text into English. It responds to the caller (a Knative Broker) with a new CloudEvent containing the translation.

## Deployment

This function can be deployed to a Knative-enabled cluster with the following command.

```
$ func deploy
```
