SHELL := /bin/bash
BASEDIR=$(shell pwd)
SSH :=`cat ~/.ssh/id_rsa`
RUN_ARGS=$(filter-out $@,$(MAKECMDGOALS))
$(eval $(RUN_ARGS):;@:)

# need to log-in in the context of the makefile shell session
setup:
	./scripts/setup.sh;
