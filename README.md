# KubeCon NA 2022 - Build a Twitter Translate Bot in 5 Minutes

This demo converts tweets into English using Camel-K and Knative.

It uses a Camel-K Kamelet to periodically search Twitter for [some value].
The Kamelet converts each tweet into a CloudEvent, sending it to the default Knative
Broker. A `translate` function receives these events via a `Trigger` between the
`Broker` and the function which filters for these types of events.

The `translate` function inspects the tweet language and if it's English, it simply
returns the tweet text as the `data` for a translation event. If it's not English,
the Google Translation API is used to convert the tweet text to English, and the
result is returned as the `data` in the translation event.

A `viewer` function is deployed to listen for translation events and display them in
the logs.

![System diagram](diagram.png "system diagram")

## Prerequisites
* A cluster with Knative installed
* CamelK https://camel.apache.org/camel-k/1.9.x/installation/installation.html installed
* Google Translation API key in `translate/service-account-file.json`
* Update the Twitter API credentials in [./resources/twitter-search-source-binding.yaml](resources/twitter-search-source-binding.yaml)


## Steps
* Deploy the `translate` and `viewer` functions
```
func deploy -p viewer
func deploy -p translate
```

* Install a default Knative Broker
```
kn broker create default
```

* Create the Tweet->Translate trigger
```
kn trigger create twitter-trigger -s translate --filter type=twitter.search.source
```

* Create the Translation->Viewer trigger
```
kn trigger create translate-trigger -s viewer --filter type=knative.function.translation
```

* Install the Kamelet
```
kubectl apply -f resources/twitter-search-source-binding-v1.yaml
```

* Check the logs
```
k logs -l app=viewer --tail 10 -f
```

* Cleanup
```
./resources/teardown.sh
```