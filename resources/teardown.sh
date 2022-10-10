#!/bin/sh

kubectl delete kameletbinding/twitter-search-source-binding
kn service delete viewer translate
kn trigger delete twitter-trigger
kn trigger delete translate-trigger
kn broker delete default
